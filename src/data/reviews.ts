/**
 * Avaliações de clientes.
 *
 * PENDENTE: preencher com avaliações REAIS do Perfil da Empresa no Google.
 * Não invente nem edite depoimentos. Copie o texto original, o nome como aparece
 * publicamente e a nota dada pela pessoa.
 *
 * Enquanto `items` estiver vazio, a seção de avaliações não aparece no site publicado
 * (com `showPendingMarkers` ligado, aparece um aviso de conteúdo pendente).
 */

export interface Review {
  author: string;
  /** Nota de 1 a 5. */
  rating: number;
  text: string;
  /** Ex.: "há 2 meses" ou "março de 2026" — como aparece no Google. */
  date?: string;
  /** Viagem citada, se houver. */
  trip?: string;
}

export interface ReviewsData {
  /** Link público das avaliações no Google (Perfil da Empresa / Google Maps). */
  sourceUrl: string;
  sourceName: string;
  /** Nota média e total exibidos no Google. */
  averageRating: number | null;
  totalReviews: number | null;
  items: Review[];
}

export const reviews: ReviewsData = {
  sourceUrl: '',
  sourceName: 'Google',
  averageRating: null,
  totalReviews: null,
  items: [],
};
