/**
 * Perguntas frequentes.
 *
 * Somente informações verificadas nas páginas públicas da RoadTrip021
 * ("Termos de adesão" e categorias da loja). Antes de publicar novas respostas,
 * confirme o texto com os Termos de Uso vigentes.
 *
 * As respostas aceitam HTML simples (links e <strong>), pois são montadas pela equipe.
 * Links da loja abrem na mesma aba; WhatsApp abre em nova aba.
 */
import { site, storePaths } from '@/config/site';
import { storeLink, whatsappLink } from '@/lib/links';

export interface FaqItem {
  question: string;
  answerHtml: string;
}

const terms = storeLink(storePaths.terms);
const ext = 'target="_blank" rel="noopener noreferrer"';

export const faq: FaqItem[] = [
  {
    question: 'Como faço para garantir minha vaga?',
    answerHtml: `A reserva é feita direto na página de cada viagem, na nossa <a href="${storeLink(storePaths.allTrips)}">loja online</a>: escolha a data, confira o roteiro e finalize a compra. Se quiser tirar dúvidas antes, chama a gente no <a href="${whatsappLink()}" ${ext}>WhatsApp oficial</a>.`,
  },
  {
    question: 'Quais são os valores e as formas de pagamento?',
    answerHtml:
      'O valor e as condições de pagamento de cada saída aparecem na página da viagem e são confirmados no checkout, antes de você concluir a compra.',
  },
  {
    question: 'De onde saem as viagens?',
    answerHtml: `A cidade de saída é informada em cada viagem. Você pode ver as opções com <a href="${storeLink(storePaths.departuresRio)}">saída do Rio de Janeiro</a> e com <a href="${storeLink(storePaths.departuresSaoPaulo)}">saída de São Paulo</a>.`,
  },
  {
    question: 'Quais documentos preciso levar no embarque?',
    answerHtml:
      'É obrigatório apresentar <strong>documento oficial com foto</strong> no embarque. Em viagens internacionais, confirme com nosso atendimento quais documentos o país de destino exige.',
  },
  {
    question: 'Como funciona o cancelamento?',
    answerHtml: `O pedido de cancelamento deve ser feito pelo canal oficial de atendimento com <strong>antecedência mínima de 90 dias</strong> da data de embarque. As regras completas de cancelamento e reembolso estão nos <a href="${terms}">Termos de Uso e Política de Cancelamento</a>.`,
  },
  {
    question: 'Qual é o canal oficial de atendimento?',
    answerHtml: `Nosso canal oficial é o <a href="${whatsappLink()}" ${ext}>WhatsApp ${site.whatsapp.display}</a>. Solicitações enviadas por outros meios não são consideradas, então fale sempre por lá.`,
  },
];
