/**
 * Perguntas frequentes.
 *
 * Somente informações verificadas em fontes públicas da RoadTrip021
 * ("Termos de adesão" do site e posts do Instagram). Antes de publicar novas
 * respostas, confirme o texto com os Termos de Uso vigentes.
 *
 * As respostas aceitam HTML simples (links e <strong>), pois são montadas pela equipe.
 * Links internos abrem na mesma aba; WhatsApp e Termos abrem em nova aba.
 */
import { site } from '@/config/site';
import { termsLink, tripsPage, whatsappLink } from '@/lib/links';

export interface FaqItem {
  question: string;
  answerHtml: string;
}

const terms = termsLink();
const ext = 'target="_blank" rel="noopener noreferrer"';

export const faq: FaqItem[] = [
  {
    question: 'Como faço para garantir minha vaga?',
    answerHtml: `Escolha o destino na nossa página de <a href="${tripsPage()}">viagens</a>, confira as datas e clique em <strong>Reservar</strong>: você segue para a página de pagamento da RoadTrip021 para concluir a compra. Se quiser tirar dúvidas antes, chama a gente no <a href="${whatsappLink()}" ${ext}>WhatsApp oficial</a>.`,
  },
  {
    question: 'Quais são os valores e as formas de pagamento?',
    answerHtml:
      'O valor e as condições de pagamento de cada saída aparecem ao clicar em Reservar e são confirmados no pagamento, antes de você concluir a compra.',
  },
  {
    question: 'De onde saem as viagens?',
    answerHtml: `Hoje temos viagens saindo do Rio de Janeiro e de São Paulo. Para confirmar a cidade de saída de uma data específica, fale com a gente pelo <a href="${whatsappLink()}" ${ext}>WhatsApp</a>.`,
  },
  {
    question: 'Quais documentos preciso levar no embarque?',
    answerHtml:
      'É obrigatório apresentar <strong>documento oficial com foto</strong> no embarque. Em viagens internacionais, confirme com nosso atendimento quais documentos o país de destino exige.',
  },
  {
    question: 'Como funciona o cancelamento?',
    answerHtml: `O pedido de cancelamento deve ser feito pelo canal oficial de atendimento com <strong>antecedência mínima de 90 dias</strong> da data de embarque. As regras completas de cancelamento e reembolso estão nos <a href="${terms}" ${ext}>Termos de Uso e Política de Cancelamento</a>.`,
  },
  {
    question: 'Qual é o canal oficial de atendimento?',
    answerHtml: `Nosso canal oficial é o <a href="${whatsappLink()}" ${ext}>WhatsApp ${site.whatsapp.display}</a>. Solicitações enviadas por outros meios não são consideradas, então fale sempre por lá.`,
  },
];
