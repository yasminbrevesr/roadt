/**
 * Ícones SVG inline (sem dependência externa) — apenas controles de interface.
 * Por decisão de design, o site não usa setas nem ícones decorativos/emoji.
 * Traçados: Lucide (licença ISC) — https://lucide.dev
 */
export const strokeIcons = {
  menu: '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
} as const;

export type IconName = keyof typeof strokeIcons;
