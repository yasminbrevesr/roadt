#!/usr/bin/env node
/**
 * Teste de fumaça do site (rode após `npm run build`):
 *   npm test
 *
 * Verifica, em vários tamanhos de tela:
 *  - erros no console / JavaScript e arquivos que não carregaram;
 *  - rolagem horizontal indevida;
 *  - links vazios, âncoras quebradas, links internos que não abrem (inclusive com
 *    subcaminho, como /roadt/ no GitHub Pages) e links externos sem rel="noopener";
 *  - imagens sem texto alternativo e estrutura de títulos (um único <h1>);
 *  - menu mobile, carrossel do topo, filtros de destinos e FAQ funcionando;
 *  - acessibilidade automática (axe-core, WCAG 2.1 AA).
 * Salva capturas de tela em test-results/screens/.
 *
 * Requisitos: dependências instaladas (npm install) e o Chromium do Playwright
 * (`npx playwright install chromium`, uma única vez na máquina).
 */
import { spawn } from 'node:child_process';
import { mkdir, readFile, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import path from 'node:path';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
/** Porta livre escolhida na hora (evita conflito com outro servidor aberto). */
async function freePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

const PORT = Number(process.env.SMOKE_PORT) || (await freePort());
const BASE = `http://127.0.0.1:${PORT}`;
const SHOTS = path.join(ROOT, 'test-results', 'screens');
/** Subcaminho do build (ex.: '/roadt'), lido do <link rel="canonical"> gerado. */
let BASE_PATH = '';
let HOME = `${BASE}/`;

const VIEWPORTS = [
  { name: 'mobile-320', width: 320, height: 640, mobile: true },
  { name: 'mobile-375', width: 375, height: 812, mobile: true },
  { name: 'mobile-414', width: 414, height: 896, mobile: true },
  { name: 'tablet-768', width: 768, height: 1024, mobile: true },
  { name: 'tablet-1024', width: 1024, height: 768, mobile: false },
  { name: 'laptop-1280', width: 1280, height: 800, mobile: false },
  { name: 'desktop-1440', width: 1440, height: 900, mobile: false },
  { name: 'desktop-1920', width: 1920, height: 1080, mobile: false },
];

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => console.log(`  ✓ ${msg}`);

async function startPreview() {
  try {
    await access(path.join(ROOT, 'dist', 'index.html'));
  } catch {
    console.error('dist/ não encontrado. Rode "npm run build" antes de "npm test".');
    process.exit(1);
  }
  const html = await readFile(path.join(ROOT, 'dist', 'index.html'), 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  BASE_PATH = canonical ? new URL(canonical).pathname.replace(/\/+$/, '') : '';
  HOME = `${BASE}${BASE_PATH}/`;
  const origin = canonical ? new URL(canonical).origin : undefined;
  console.log(`Testando o build em ${BASE_PATH || '/'} (canonical: ${canonical})`);
  const astroBin = path.join(ROOT, 'node_modules', '.bin', 'astro');
  // O preview precisa servir no mesmo subcaminho usado no build.
  // --ignore-lock: sempre sobe um servidor próprio (não reaproveita outro já aberto).
  // detached: cria um grupo de processos para encerrar o servidor por completo no final.
  const proc = spawn(astroBin, ['preview', '--host', '127.0.0.1', '--port', String(PORT), '--ignore-lock'], {
    cwd: ROOT,
    stdio: 'ignore',
    detached: true,
    env: { ...process.env, PUBLIC_BASE_PATH: BASE_PATH, ...(origin && { PUBLIC_SITE_URL: origin }) },
  });
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(HOME);
      if (res.ok) return proc;
    } catch {
      /* aguardando o servidor */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  stopPreview(proc);
  throw new Error('O servidor de preview não respondeu.');
}

function stopPreview(proc) {
  try {
    process.kill(-proc.pid, 'SIGTERM'); // encerra o grupo inteiro (processo + filhos)
  } catch {
    proc.kill('SIGTERM');
  }
}

async function checkPage(browser, vp, axeSource) {
  console.log(`\n▶ ${vp.name} (${vp.width}×${vp.height})`);
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.mobile && vp.width < 768,
    hasTouch: vp.mobile,
    reducedMotion: 'reduce',
    locale: 'pt-BR',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => {
    if (r.url().startsWith(BASE)) errors.push(`requestfailed: ${r.url()}`);
  });
  page.on('response', (r) => {
    if (r.url().startsWith(BASE) && r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`);
  });

  await page.goto(HOME, { waitUntil: 'networkidle' });

  // 1) Rolagem horizontal
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    if (doc.scrollWidth <= window.innerWidth) return null;
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.right > window.innerWidth + 1 && !el.closest('[data-dest-grid], .ticker')) {
        offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} (right=${Math.round(r.right)})`);
      }
      if (offenders.length > 8) break;
    }
    return { scrollWidth: doc.scrollWidth, offenders };
  });
  if (overflow) fail(`[${vp.name}] rolagem horizontal: ${overflow.scrollWidth}px > ${vp.width}px → ${overflow.offenders.join(', ')}`);
  else ok('sem rolagem horizontal');

  // 2) Estrutura e conteúdo
  const audit = await page.evaluate(() => {
    const issues = [];
    const h1 = document.querySelectorAll('h1').length;
    if (h1 !== 1) issues.push(`esperado 1 <h1>, encontrados ${h1}`);
    document.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('alt')) issues.push(`imagem sem alt: ${img.src}`);
    });
    document.querySelectorAll('[role="img"]').forEach((el) => {
      if (!el.getAttribute('aria-label')) issues.push(`role=img sem aria-label: ${el.className}`);
    });
    const external = new Set();
    const internal = new Set();
    document.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') {
        issues.push(`link sem destino: "${a.textContent.trim().slice(0, 40)}"`);
        return;
      }
      const url = new URL(href, location.href);
      if (url.origin === location.origin) {
        if (url.pathname === location.pathname && url.hash) {
          const id = decodeURIComponent(url.hash.slice(1));
          if (!document.getElementById(id)) issues.push(`âncora quebrada: ${href}`);
        } else {
          internal.add(url.pathname);
        }
      } else if (/^https?:/.test(url.protocol)) {
        external.add(href.split('?')[0]);
        if (a.target === '_blank' && !/noopener/.test(a.rel)) issues.push(`link externo sem noopener: ${href}`);
      }
    });
    document.querySelectorAll('link[rel="icon"]').forEach((l) => internal.add(new URL(l.href).pathname));
    document.querySelectorAll('button').forEach((b) => {
      const name = (b.getAttribute('aria-label') || b.textContent || '').trim();
      if (!name) issues.push('botão sem nome acessível');
    });
    return { issues, external: [...external], internal: [...internal] };
  });
  for (const pathname of audit.internal) {
    const res = await fetch(BASE + pathname);
    if (!res.ok) audit.issues.push(`link interno não abre (${res.status}): ${pathname}`);
  }
  audit.issues.forEach((i) => fail(`[${vp.name}] ${i}`));
  if (!audit.issues.length) ok('títulos, imagens, links e botões consistentes');

  // 3) Menu: mobile abre/fecha; desktop mostra navegação
  const toggle = page.locator('[data-menu-open]');
  if (await toggle.isVisible()) {
    await toggle.click();
    const open = await page.evaluate(() => document.querySelector('[data-menu]')?.open);
    const expanded = await toggle.getAttribute('aria-expanded');
    if (!open || expanded !== 'true') fail(`[${vp.name}] menu mobile não abriu`);
    if (vp.name === 'mobile-375') await page.screenshot({ path: path.join(SHOTS, `${vp.name}-menu.png`) });
    await page.keyboard.press('Escape');
    // O navegador processa o ESC de forma assíncrona: espera até 2s pelo fechamento.
    const closed = await page
      .waitForFunction(() => !document.querySelector('[data-menu]')?.open, null, { timeout: 2000 })
      .then(() => true)
      .catch(() => false);
    if (!closed || (await toggle.getAttribute('aria-expanded')) !== 'false') fail(`[${vp.name}] menu não fechou com ESC`);
    // fecha ao clicar em um link
    await toggle.click();
    await page.locator('[data-menu] a[href$="#duvidas"]').click();
    const closedByLink = await page
      .waitForFunction(() => !document.querySelector('[data-menu]')?.open, null, { timeout: 2000 })
      .then(() => true)
      .catch(() => false);
    if (!closedByLink) fail(`[${vp.name}] menu não fechou ao escolher um link`);
    if (!page.url().endsWith('#duvidas')) fail(`[${vp.name}] link do menu não navegou para #duvidas`);
    ok('menu mobile abre, fecha (ESC e link) e navega');
  } else {
    const navVisible = await page.locator('.site-header__nav').isVisible();
    if (!navVisible) fail(`[${vp.name}] navegação desktop não visível`);
    else ok('navegação desktop visível');
  }

  // 4) Filtros de destinos
  await page.locator('[data-filter="internacional"]').click();
  const intl = await page.locator('[data-dest-grid] > li:not([hidden])').count();
  await page.locator('[data-filter="brasil"]').click();
  const br = await page.locator('[data-dest-grid] > li:not([hidden])').count();
  await page.locator('[data-filter="all"]').click();
  const all = await page.locator('[data-dest-grid] > li:not([hidden])').count();
  if (!(intl > 0 && br > 0 && intl + br === all)) fail(`[${vp.name}] filtros inconsistentes (${intl} + ${br} ≠ ${all})`);
  else ok(`filtros de destinos (${intl} + ${br} = ${all})`);

  // 5) FAQ (accordion)
  const summaries = page.locator('.faq__item > summary');
  await summaries.nth(0).click();
  const firstOpen = await page.locator('.faq__item').nth(0).evaluate((d) => d.open);
  await summaries.nth(1).click();
  const states = await page.locator('.faq__item').evaluateAll((els) => els.map((d) => d.open));
  if (!firstOpen || !states[1]) fail(`[${vp.name}] FAQ não abriu`);
  else ok(`FAQ abre ao clicar${states[0] ? '' : ' (um item por vez)'}`);
  await summaries.nth(1).click();

  // 6) Carrossel do topo (indicadores e pausar/continuar)
  const heroControls = page.locator('[data-hero-controls]');
  if (await heroControls.count()) {
    await heroControls.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (!(await heroControls.isVisible())) {
      fail(`[${vp.name}] controles do carrossel não apareceram`);
    } else {
      const dots = page.locator('[data-hero-controls] [data-go]');
      await dots.nth(1).click();
      const active = await page.locator('[data-slide].is-active').getAttribute('data-slide');
      const current = await dots.nth(1).getAttribute('aria-current');
      const pause = page.locator('[data-hero-pause]');
      const before = await pause.getAttribute('aria-pressed');
      await pause.click();
      const after = await pause.getAttribute('aria-pressed');
      await pause.click();
      await dots.nth(0).click();
      if (active !== '1' || current !== 'true') fail(`[${vp.name}] carrossel não trocou de foto pelo indicador`);
      else if (before === after) fail(`[${vp.name}] botão pausar/continuar do carrossel não alternou`);
      else ok('carrossel: indicadores e pausar/continuar');
    }
  }

  // 7) Acessibilidade (axe-core)
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) }));
  });
  for (const v of axe) {
    const msg = `[${vp.name}] axe ${v.impact}: ${v.id} — ${v.help} → ${v.nodes.join(' | ')}`;
    if (v.impact === 'serious' || v.impact === 'critical') fail(msg);
    else warnings.push(msg);
  }
  if (!axe.length) ok('axe-core: nenhuma violação WCAG 2.1 AA');

  // 8) Erros de console/rede
  errors.forEach((e) => fail(`[${vp.name}] ${e}`));
  if (!errors.length) ok('sem erros de console ou de rede');

  // 9) Captura de tela
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(SHOTS, `${vp.name}.png`), fullPage: true });

  await context.close();
  return audit.external;
}

/** Sem "reduzir movimento", o carrossel deve trocar de foto sozinho. */
async function checkAutoplay(browser) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(HOME, { waitUntil: 'load' });
  if (!(await page.locator('[data-hero-controls]').count())) return page.close();
  const interval = Number(await page.locator('[data-hero]').getAttribute('data-interval')) || 6000;
  await page.mouse.move(5, 5); // fora do carrossel (sobre o cabeçalho)
  const changed = await page
    .waitForFunction(() => document.querySelector('[data-slide].is-active')?.getAttribute('data-slide') !== '0', null, {
      timeout: interval + 3000,
    })
    .then(() => true)
    .catch(() => false);
  if (!changed) fail('carrossel não trocou de foto automaticamente');
  else ok('carrossel troca de foto automaticamente');
  await page.close();
}

async function check404(browser) {
  const page = await browser.newPage();
  const res = await page.goto(`${BASE}${BASE_PATH}/pagina-que-nao-existe`);
  const h1 = await page.locator('h1').textContent();
  if (res?.status() !== 404 || !h1?.includes('rota')) fail(`página 404 não exibida corretamente (status ${res?.status()})`);
  else ok('página 404 personalizada');
  await page.close();
}

const preview = await startPreview();
let exitCode = 0;
try {
  await mkdir(SHOTS, { recursive: true });
  const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
  const browser = await chromium.launch();
  const external = new Set();
  for (const vp of VIEWPORTS) {
    (await checkPage(browser, vp, axeSource)).forEach((u) => external.add(u));
  }
  console.log('\n▶ carrossel automático');
  await checkAutoplay(browser);
  console.log('\n▶ 404');
  await check404(browser);
  await browser.close();

  console.log(`\nLinks externos encontrados (${external.size}) — confira manualmente se estão no ar:`);
  [...external].sort().forEach((u) => console.log(`  · ${u}`));
} catch (err) {
  fail(String(err?.stack || err));
} finally {
  stopPreview(preview);
}

if (warnings.length) {
  console.log(`\n⚠ Avisos (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (failures.length) {
  console.log(`\n✗ Falhas (${failures.length}):`);
  failures.forEach((f) => console.log(`  - ${f}`));
  exitCode = 1;
} else {
  console.log(`\n✓ Todos os testes passaram. Capturas em ${path.relative(ROOT, SHOTS)}/`);
}
process.exit(exitCode);
