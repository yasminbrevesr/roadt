# RoadTrip021 — site institucional

Novo site da **RoadTrip021**, empresa de viagens e experiências em grupo.
Homepage editorial, mobile-first, rápida e acessível, que leva o visitante para a
**loja Nuvemshop** (onde continuam produtos, carrinho e checkout).

> O site **não substitui** a loja. Todos os botões de compra apontam para as páginas
> reais de produto da Nuvemshop — nada do fluxo de pagamento foi alterado.

---

## Sumário

1. [Como rodar o projeto](#como-rodar-o-projeto)
2. [Como editar o conteúdo](#como-editar-o-conteúdo)
3. [Fotos e logo](#fotos-e-logo)
4. [Pendências antes de publicar](#pendências-antes-de-publicar)
5. [Publicação (deploy)](#publicação-deploy)
6. [Testes](#testes)
7. [Estrutura do projeto](#estrutura-do-projeto)
8. [Decisões técnicas](#decisões-técnicas)

---

## Como rodar o projeto

Pré-requisito: **Node.js 22.12 ou superior** ([nodejs.org](https://nodejs.org/)).

1. Instale as dependências (só na primeira vez):

   ```bash
   npm install
   ```

2. Rode em modo de desenvolvimento (atualiza sozinho ao salvar arquivos):

   ```bash
   npm run dev
   ```

   Abra o endereço mostrado no terminal (normalmente http://localhost:4321).

3. Gere a versão final (verifica tipos e cria a pasta `dist/`):

   ```bash
   npm run build
   ```

4. Visualize a versão final localmente:

   ```bash
   npm run preview
   ```

---

## Como editar o conteúdo

Todo o conteúdo do negócio fica separado dos componentes visuais. Para mudar textos,
viagens ou links, edite apenas os arquivos abaixo:

| O que mudar | Arquivo |
| --- | --- |
| WhatsApp, Instagram, URL da loja, textos institucionais, CNPJ | `src/config/site.ts` |
| **Próximas saídas** (datas e links de compra) | `src/data/departures.ts` |
| Destinos da seção "Descubra nossas viagens" | `src/data/destinations.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Diferenciais ("Por que viajar com a RoadTrip?") | `src/data/highlights.ts` |
| Avaliações do Google | `src/data/reviews.ts` |
| Fotos da seção Instagram | `src/data/gallery.ts` |
| Menu e links do rodapé | `src/data/navigation.ts` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |

### Adicionar uma nova saída

Em `src/data/departures.ts`, copie um bloco existente e ajuste:

```ts
{
  id: 'jalapao-2027-04-01',            // único, sem espaços
  destination: 'jalapao',              // mesmo "slug" de destinations.ts (define a foto)
  title: 'Expedição Jalapão',
  location: 'Tocantins · Brasil',
  start: '2027-04-01',                 // AAAA-MM-DD
  end: '2027-04-06',
  url: '/produtos/expedicao-jalapao-.../', // caminho da página do produto na Nuvemshop
  // price: 4990,                      // opcional — só com valor confirmado
},
```

- A duração ("6 dias") é calculada automaticamente pelas datas.
- Saídas com data já passada **somem sozinhas** (no build e também no navegador).
- A homepage mostra as 6 próximas (4 no celular/tablet) e um botão para o calendário completo.

---

## Fotos e logo

- **Fotos:** salve em `src/assets/photos/` com os nomes listados em
  [`src/assets/photos/README.md`](src/assets/photos/README.md). O site otimiza tudo
  automaticamente (AVIF/WebP, tamanhos responsivos, carregamento sob demanda).
- **Logo:** salve o arquivo oficial em `src/assets/brand/logo.svg`
  (veja [`src/assets/brand/README.md`](src/assets/brand/README.md)).

Enquanto uma foto não existir, aparece um espaço reservado com a etiqueta
**"Foto pendente"** e o nome do arquivo esperado.

---

## Pendências antes de publicar

Itens que dependem de material ou confirmação da empresa. Nenhum deles foi inventado:
onde faltava informação verificada, o site deixa o espaço preparado.

- [ ] **Fotos originais** (hero, 10 destinos, 3 fotos institucionais, 6 do Instagram) — ver lista acima.
- [ ] **Logo oficial** em `src/assets/brand/logo.svg`.
- [ ] **Paleta de cores oficial**: as cores atuais foram definidas no redesign sem acesso ao
      manual da marca. Se houver cores oficiais, ajuste `src/styles/tokens.css`.
- [ ] **Avaliações do Google**: preencher `src/data/reviews.ts` (nota média, total, depoimentos reais e link).
      Sem isso, a seção de avaliações fica oculta no site publicado.
- [ ] **Dados legais** (razão social, CNPJ, endereço) em `src/config/site.ts` → `legal`.
- [ ] **Confirmar o WhatsApp oficial** `(21) 96724-5753` (fonte: Termos de adesão do site atual).
      Outras páginas antigas da loja citam números diferentes.
- [ ] **Validar o link "Ver saídas" dos destinos** (usa a busca da loja: `/search/?q=...`).
      Se não abrir resultados, troque `search` por `'/viagens'` em `src/config/site.ts`.
- [ ] **Imagem de compartilhamento** (1200×630) em `public/og-image.jpg` e informar em `site.seo.ogImage`.
- [ ] **Revisar textos** institucionais e do FAQ com a equipe.
- [ ] Ao concluir tudo, **desligar as etiquetas de pendência**: `showPendingMarkers: false` em `src/config/site.ts`.

---

## Publicação (deploy)

O comando `npm run build` gera um site **estático** na pasta `dist/`, que pode ser publicado
em qualquer hospedagem estática (Vercel, Netlify, Cloudflare Pages, GitHub Pages etc.).

Configuração típica (Vercel / Netlify / Cloudflare Pages):

- Comando de build: `npm run build`
- Pasta de saída: `dist`
- Variável de ambiente: `PUBLIC_SITE_URL` = endereço final do site (ex.: `https://www.roadtrip021.com.br`)

### ⚠️ Atenção ao domínio (decisão de negócio)

Hoje `www.roadtrip021.com.br` aponta para a **loja Nuvemshop**. Há dois caminhos:

1. **Site novo em um subdomínio** (ex.: `site.roadtrip021.com.br`) — nenhuma mudança na loja. Mais simples e sem risco.
2. **Site novo no domínio principal** — a loja precisa passar para um subdomínio
   (ex.: `loja.roadtrip021.com.br`) no painel da Nuvemshop **antes** da troca de DNS. Depois,
   atualize `storeUrl` em `src/config/site.ts`. Esse caminho afeta SEO, links antigos e
   anúncios; planeje redirecionamentos com cuidado.

---

## Testes

Após o build, rode o teste automatizado:

```bash
npm test
```

Na primeira vez, instale o navegador usado nos testes:

```bash
npx playwright install chromium
```

O teste abre o site em 8 tamanhos de tela (320 px a 1920 px) e verifica:

- erros de JavaScript/console e arquivos que não carregaram;
- rolagem horizontal indevida;
- links vazios, âncoras quebradas e links externos sem `rel="noopener"`;
- imagens sem texto alternativo e estrutura de títulos;
- menu mobile (abrir, fechar com ESC, fechar ao clicar), filtros de destinos e FAQ;
- acessibilidade automática (axe-core, WCAG 2.1 AA);
- página 404.

As capturas de tela ficam em `test-results/screens/` (pasta ignorada pelo Git).

---

## Estrutura do projeto

```
src/
├── config/site.ts           # dados do negócio (contatos, links, textos institucionais)
├── data/                    # conteúdo: saídas, destinos, FAQ, avaliações, galeria, menu
├── lib/                     # utilitários (datas, links da loja/WhatsApp)
├── styles/                  # tokens de design + estilos globais
├── layouts/BaseLayout.astro # <head>, SEO, dados estruturados, header/footer
├── components/
│   ├── layout/              # Header (com menu mobile), Footer
│   ├── cards/               # TravelCard, DepartureCard, TestimonialCard
│   ├── ui/                  # CTAButton, SectionTitle, Photo, Logo, Icon, PendingNote
│   └── FAQAccordion.astro
├── sections/                # seções da homepage (Hero, Destinations, UpcomingTrips, ...)
├── pages/                   # index.astro (homepage) e 404.astro
└── assets/                  # fotos e logo (otimizados no build)
public/                      # arquivos servidos como estão (favicon, robots.txt)
scripts/smoke-test.mjs       # teste automatizado
```

---

## Decisões técnicas

- **[Astro](https://astro.build/) 7** gerando HTML estático: carregamento rápido, ótimo para SEO e
  Core Web Vitals, sem servidor para manter. Versão fixada (`7.3.8`) e sem vulnerabilidades
  conhecidas no `npm audit` na data da implementação.
- **Sem framework JavaScript no navegador.** Interações (menu, filtros, animações) usam
  poucas linhas de JavaScript nativo; o FAQ funciona até sem JavaScript (`<details>`).
- **Fontes hospedadas no próprio site** (Bricolage Grotesque + Figtree, via Fontsource):
  sem requisições ao Google Fonts.
- **Acessibilidade:** HTML semântico, link "pular para o conteúdo", foco visível,
  menu mobile em `<dialog>` (prende o foco e fecha com ESC), contraste AA verificado,
  respeito à preferência "reduzir movimento".
- **Ícones:** SVG inline copiados de [Lucide](https://lucide.dev) (ISC) e
  [Simple Icons](https://simpleicons.org) (CC0) — sem dependência extra.
- **Instagram:** galeria estática com link para o perfil (não há integração com a API).
- **Preços:** não ficam fixos no código porque mudam e apareciam divergentes entre páginas da
  loja; o valor real é exibido na página de compra. É possível exibir um preço confirmado
  preenchendo `price` em `departures.ts`.

### Próximo passo sugerido (opcional)

Sincronizar automaticamente as saídas com a Nuvemshop via
[API oficial](https://dev.nuvemshop.com.br/) durante o build
(títulos, datas, preços e fotos dos produtos), eliminando a atualização manual de
`departures.ts`. Requer criar um app/token na conta da loja.
