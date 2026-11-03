/**
 * Configuração central do site.
 *
 * Tudo o que é "informação do negócio" (links, contatos, textos institucionais)
 * fica aqui, para que a equipe altere em um só lugar sem mexer nos componentes.
 *
 * Fontes das informações (levantamento de 03/11/2026):
 * - Loja Nuvemshop: https://www.roadtrip021.com.br (páginas /viagens, /produtos, /quem-somos, /termos-de-adesao)
 * - WhatsApp oficial: página "Termos de adesão" — "único canal oficial de atendimento"
 * - Instagram: https://www.instagram.com/roadtrip021/
 */

export const site = {
  name: 'RoadTrip021',
  /** Slogan usado pela marca na página "Quem somos". */
  tagline: 'Você sonha e a gente realiza!',
  /** Descrição institucional usada pela própria marca (perfil público). */
  mission:
    'A RoadTrip021 nasceu para conectar pessoas e proporcionar novas e únicas experiências através de viagens em grupo, trilhas e aventuras que criam memórias e amizades para a vida toda.',
  /** Texto curto para SEO (title/description). */
  seo: {
    title: 'RoadTrip021 · Viagens e experiências em grupo',
    description:
      'Viagens em grupo, trilhas e aventuras que criam memórias e amizades para a vida toda. Saídas do Rio de Janeiro e de São Paulo para destinos no Brasil e na América do Sul.',
    /**
     * Imagem de compartilhamento (WhatsApp, Instagram, Facebook).
     * Coloque um arquivo 1200x630 em public/og-image.jpg e informe o caminho aqui.
     * PENDENTE: deixe vazio enquanto não houver uma foto original.
     */
    ogImage: '',
  },
  /** A história da marca começou em agosto de 2019 (página "Quem somos"). */
  since: { year: 2019, label: 'agosto de 2019' },
  homeBase: 'Rio de Janeiro',
  locale: 'pt-BR',

  /**
   * Loja Nuvemshop: produtos, carrinho e checkout continuam lá.
   * Se este site passar a ocupar o domínio principal, troque pela nova URL da loja
   * (ex.: https://loja.roadtrip021.com.br) — todos os links de compra usam este valor.
   */
  storeUrl: 'https://www.roadtrip021.com.br',

  whatsapp: {
    /** Somente dígitos, com DDI + DDD. */
    number: '5521967245753',
    display: '(21) 96724-5753',
    defaultMessage: 'Olá! Vim pelo site e quero saber mais sobre as viagens da RoadTrip021.',
  },

  instagram: {
    handle: 'roadtrip021',
    url: 'https://www.instagram.com/roadtrip021/',
  },

  /**
   * Dados legais exibidos no rodapé. Só aparecem quando preenchidos.
   * PENDENTE: confirmar razão social, CNPJ e endereço com a empresa antes de publicar.
   */
  legal: {
    companyName: '',
    cnpj: '',
    address: '',
  },

  /**
   * Mostra etiquetas "pendente" nas fotos e seções que aguardam conteúdo real.
   * Desligue (false) quando todas as fotos e avaliações tiverem sido incluídas.
   */
  showPendingMarkers: true,

  /**
   * Permite que buscadores (Google) indexem o site.
   * Mantenha false enquanto o site for uma prévia (fotos pendentes / endereço provisório
   * no GitHub Pages). Mude para true quando publicar no domínio definitivo.
   */
  allowIndexing: false,
} as const;

/**
 * Páginas da loja Nuvemshop que continuam sendo usadas.
 * A navegação de viagens é interna (páginas /viagens/); a loja recebe apenas a
 * reserva/pagamento (URL de cada saída em departures.ts) e o documento legal abaixo.
 */
export const storePaths = {
  /** Termos de Uso e Política de Cancelamento (documento legal oficial). */
  terms: '/termos-de-adesao/',
} as const;
