export interface Licao {
  id: number;
  titulo: string;
  subtitulo: string;
  conteudo: string[];
  citacao: string;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}

export const licoesArkad: Licao[] = [
  {
    id: 1,
    titulo: '1ª Cura: Comece a Encher o Seu Bolso',
    subtitulo: 'O princípio fundamental de pagar a si mesmo primeiro',
    conteudo: [
      'A jornada para a riqueza começa com uma decisão simples: de cada dez moedas que você colocar na sua bolsa, retire apenas nove para gastar.',
      'Ao guardar no mínimo 10% de tudo o que ganha antes de pagar qualquer conta, sua bolsa começa a engordar rapidamente. Esse dinheiro não deve ser tocado para despesas comuns, pois ele é a semente da sua futura árvore de riqueza.'
    ],
    citacao: 'Uma parte de tudo o que você ganha pertence a você.',
    pergunta: 'De acordo com Arkad, qual é o primeiro destino que você deve dar ao receber sua renda mensal?',
    opcoes: [
      'Pagar todas as contas e guardar apenas o que sobrar no fim do mês.',
      'Separar no mínimo 10% para você mesmo antes de qualquer outro gasto.',
      'Gastar tudo em coisas que tragam felicidade imediata.'
    ],
    respostaCorreta: 1,
    explicacao: 'Pagar a si mesmo primeiro garante que sua reserva cresça todos os meses, independentemente do tamanho do seu salário.'
  },
  {
    id: 2,
    titulo: '2ª Cura: Controle os Seus Gastos',
    subtitulo: 'A diferença entre necessidades reais e desejos supérfluos',
    conteudo: [
      'Muitas pessoas acreditam que não conseguem poupar porque ganham pouco, mas na verdade suas despesas sempre crescem na mesma proporção que seus ganhos.',
      'Orçamente seus gastos para viver confortavelmente com 70% da sua renda. Nunca confunda despesas necessárias com desejos impulsivos.'
    ],
    citacao: 'O que cada um de nós chama de despesas necessárias sempre crescerá até igualar nossas receitas, a menos que protestemos contra isso.',
    pergunta: 'Como Arkad recomenda organizar seu orçamento para manter o padrão de vida sob controle?',
    opcoes: [
      'Ajustar o custo de vida para caber dentro de 70% dos ganhos mensais.',
      'Cortar absolutamente todo tipo de lazer e viver na miséria.',
      'Usar crédito para cobrir os desejos que o salário não paga.'
    ],
    respostaCorreta: 0,
    explicacao: 'Viver com 70% permite cobrir as necessidades essenciais e ainda aproveitar a vida sem comprometer os 10% da poupança e os 20% das dívidas.'
  },
  {
    id: 3,
    titulo: '3ª Cura: Multiplique os Seus Rendimentos',
    subtitulo: 'Faça cada moeda trabalhar como um servo fiel',
    conteudo: [
      'O ouro guardado na bolsa apenas satisfaz a alma avarenta, mas não gera riqueza. A verdadeira fortuna vem da renda que esse ouro produz quando bem aplicado.',
      'Coloque cada moeda poupada para trabalhar, fazendo com que ela gere filhos (juros/rendimentos), e que esses filhos também trabalhem para você.'
    ],
    citacao: 'A riqueza de um homem não está nas moedas que ele carrega na bolsa, mas na renda que ele constrói.',
    pergunta: 'O que transforma uma simples poupança em verdadeira riqueza duradoura?',
    opcoes: [
      'Deixar o dinheiro parado embaixo do colchão por muitos anos.',
      'Fazer o dinheiro poupado trabalhar e gerar rendimentos contínuos.',
      'Gastar a poupança inteira assim que atingir um valor alto.'
    ],
    respostaCorreta: 1,
    explicacao: 'Quando os rendimentos geram novos rendimentos (juros compostos), o fluxo de dinheiro passa a entrar na sua bolsa mesmo enquanto você descansa.'
  },
  {
    id: 4,
    titulo: '4ª Cura: Proteja o Seu Tesouro Contra Perdas',
    subtitulo: 'A primeira lei do investimento seguro',
    conteudo: [
      'O primeiro princípio de qualquer investimento é a segurança do seu capital principal. Nunca se deixe seduzir por promessas de lucros rápidos e irreais.',
      'Antes de confiar seu dinheiro a qualquer negócio, estude os riscos e peça conselhos apenas a pessoas que realmente têm experiência comprovada em lidar com dinheiro.'
    ],
    citacao: 'É melhor uma pequena cautela do que um grande arrependimento.',
    pergunta: 'Qual deve ser sua prioridade máxima antes de investir suas economias?',
    opcoes: [
      'Buscar o retorno mais rápido possível, mesmo sem entender o negócio.',
      'Seguir dicas de amigos que nunca tiveram sucesso financeiro.',
      'Garantir a segurança do capital principal e consultar especialistas experientes.'
    ],
    respostaCorreta: 2,
    explicacao: 'Perder o capital principal destrói anos de esforço. Proteger o que você já acumulou vem sempre antes da busca por altos lucros.'
  },
  {
    id: 5,
    titulo: 'A Regra das Dívidas: Honre Seus Compromissos',
    subtitulo: 'Como sair das dívidas mantendo a dignidade e a poupança',
    conteudo: [
      'Mesmo estando endividado, você deve manter o hábito de guardar 10% para você. Ao mesmo tempo, separe exatamente 20% da sua renda para negociar e pagar seus credores.',
      'Divida esses 20% de forma justa entre aqueles a quem você deve e cumpra os pagamentos religiosamente todo mês até zerar cada tabuleta.'
    ],
    citacao: 'Onde há determinação, encontra-se o caminho.',
    pergunta: 'Qual é a estratégia de Arkad para quem possui dívidas acumuladas?',
    opcoes: [
      'Usar 100% do salário para pagar dívidas e não guardar nada para si.',
      'Separar 10% para si, 20% para quitar dívidas e viver com os 70% restantes.',
      'Ignorar os credores até que a dívida desapareça sozinha.'
    ],
    respostaCorreta: 1,
    explicacao: 'A divisão 10/20/70 permite limpar seu nome com honra enquanto você continua construindo seu próprio patrimônio.'
  }
];
