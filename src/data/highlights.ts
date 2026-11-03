/**
 * Diferenciais — seção "Por que viajar com a RoadTrip?".
 * Baseados apenas no que a marca comunica publicamente (propósito, destinos
 * publicados, cidades de saída e canal oficial de atendimento).
 */
export interface Highlight {
  title: string;
  text: string;
}

export const highlights: Highlight[] = [
  {
    title: 'Viagens em grupo',
    text: 'Cada roteiro é vivido junto, com gente que também quer conhecer o mundo. A experiência é compartilhada do começo ao fim.',
  },
  {
    title: 'Amizades para a vida toda',
    text: 'Nosso propósito é conectar pessoas. A viagem termina, mas as memórias e as amizades ficam.',
  },
  {
    title: 'Trilhas e aventuras',
    text: 'Expedições pela natureza em lugares como Jalapão, Lençóis Maranhenses, Chapada Diamantina e Ibitipoca.',
  },
  {
    title: 'Brasil e América do Sul',
    text: 'Da costa da Bahia ao Salar de Uyuni, passando pelo Deserto do Atacama e por Machu Picchu.',
  },
  {
    title: 'Saídas do Rio e de São Paulo',
    text: 'Viagens com saída do Rio de Janeiro e de São Paulo, organizadas por data no nosso calendário.',
  },
  {
    title: 'Atendimento direto',
    text: 'Dúvidas e solicitações passam por um único canal oficial, o WhatsApp. Simples, direto e sem ruído.',
  },
];
