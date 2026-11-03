/**
 * Utilitários de data para as saídas das viagens.
 * As datas são guardadas como 'AAAA-MM-DD' e tratadas em UTC para evitar
 * diferenças de fuso horário entre o build e o navegador.
 */

const MONTHS_SHORT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export interface DateParts {
  day: string;
  month: string;
  year: number;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) throw new Error(`Data inválida: "${iso}" (use AAAA-MM-DD)`);
  return new Date(Date.UTC(y, m - 1, d));
}

export function dateParts(iso: string): DateParts {
  const date = parseISODate(iso);
  return {
    day: String(date.getUTCDate()).padStart(2, '0'),
    month: MONTHS_SHORT[date.getUTCMonth()] ?? '',
    year: date.getUTCFullYear(),
  };
}

/** Quantidade de dias da viagem, contando o dia de ida e o de volta. */
export function durationInDays(startISO: string, endISO: string): number {
  const ms = parseISODate(endISO).getTime() - parseISODate(startISO).getTime();
  return Math.round(ms / 86_400_000) + 1;
}

/** Ex.: "19 – 24 nov 2026" ou "28 dez 2026 – 02 jan 2027". */
export function formatRange(startISO: string, endISO: string): string {
  const s = dateParts(startISO);
  const e = dateParts(endISO);
  if (s.year !== e.year) return `${s.day} ${s.month} ${s.year} – ${e.day} ${e.month} ${e.year}`;
  if (s.month !== e.month) return `${s.day} ${s.month} – ${e.day} ${e.month} ${e.year}`;
  return `${s.day} – ${e.day} ${e.month} ${e.year}`;
}

/** Data longa e acessível para leitores de tela. Ex.: "19 de novembro de 2026". */
export function formatLong(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    parseISODate(iso),
  );
}

/** Hoje (UTC) no formato AAAA-MM-DD. */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
