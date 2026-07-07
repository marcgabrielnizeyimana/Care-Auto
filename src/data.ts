export interface PainPoint {
  id: string;
  title: string;
  text: string;
  icon?: string;
  footerText?: string;
}

export interface Pilar {
  id: string;
  title: string;
  text: string;
  footerText?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  text: string;
}

export interface ClientProfile {
  id: string;
  title: string;
  text: string;
  tag: string;
  isMain?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline?: string;
  price: string;
  priceText?: string;
  includes: string[];
  forWho: string;
  ctaText: string;
}

export interface Differentiator {
  id: string;
  title: string;
  text: string;
}

export const navBrand = {
  name: "SIG Care Auto",
  subtitle: "Gestão Automóvel Profissional"
};

export const heroSection = {
  eyebrow: "SIG Care Auto",
  title_part1: "O teu carro tem um problema. ",
  title_highlight: "O teu tempo não.",
  subtitle: "Gerir oficinas, procurar peças, acompanhar reparações — isso consome tempo e energia que devia estar noutro sítio. A SIG Care Auto trata de tudo isso por ti.",
  ctaWhatsApp: "Falar pelo WhatsApp",
  ctaEmail: "Enviar Email",
  trustLines: [
    "Rede em Moçambique e RSA",
    "Aprovação prévia em cada decisão"
  ]
};

export const doresSection = {
  title: "Situações que a SIG resolve",
  subtitle: "Não precisas de saber o que fazer a seguir. Só precisas de nos contar o problema.",
  items: [
    {
      id: "dor-01",
      title: "O carro avariou e não sei o que tem",
      text: "A luz acendeu, faz um barulho estranho ou simplesmente não arranca. Não sabes se é grave, quanto vai custar ou onde levar. A SIG trata do diagnóstico e do processo todo.",
      icon: "Clock",
      footerText: "DIAGNÓSTICO E REPARAÇÃO →"
    },
    {
      id: "dor-02",
      title: "Não tenho tempo para ficar numa oficina",
      text: "A tua agenda não tem espaço para horas de espera. A SIG coordena tudo enquanto tu segues com o teu dia — e mantém-te informado a cada passo.",
      icon: "Clock",
      footerText: "GESTÃO COMPLETA DO PROCESSO →"
    },
    {
      id: "dor-03",
      title: "A peça não existe em Maputo",
      text: "A oficina diz que tem de vir da África do Sul. Não sabes de quem comprar, quanto pagar, nem quando chega. A SIG tem rede na RSA e coordena a compra e o transporte.",
      icon: "MapPin",
      footerText: "PROCUREMENT E REDE RSA →"
    },
    {
      id: "dor-04",
      title: "A empresa tem viaturas mas ninguém as gere",
      text: "A manutenção fica ao critério do motorista. Quando uma viatura para, a operação para. A SIG actua como o vosso gestor de frota externo — com relatórios e processo documentado.",
      icon: "Users",
      footerText: "GESTÃO DE FROTA →"
    },
    {
      id: "dor-05",
      title: "Não sei se posso confiar na oficina",
      text: "Não tens como confirmar se o diagnóstico é correcto, se o preço é justo ou se a peça recomendada é mesmo necessária. A SIG trabalha só com parceiros verificados e apresenta-te todas as opções.",
      icon: "Shield",
      footerText: "PARCEIROS VERIFICADOS →"
    },
    {
      id: "dor-06",
      title: "Quero comprar um carro usado mas tenho medo",
      text: "Não sabes o histórico, o estado real do motor ou o que vai custar a reparar. A SIG coordena uma inspecção técnica independente antes de comprares. Decides com informação.",
      icon: "FileText",
      footerText: "AVALIAÇÃO PRÉ-COMPRA →"
    }
  ] as PainPoint[]
};

export const solucaoSection = {
  title: "Foca-te no que só tu podes fazer.",
  subtitle: "O teu expertise é insubstituível. A gestão do teu carro não precisa de ser tua.",
  citacao: "O cliente não precisa de perceber de mecânica, de correr atrás de oficinas, de procurar peças ou de gerir prazos. A SIG Care Auto faz isso por si — com processo, com parceiros seleccionados e com transparência total em cada passo.",
  signature: "SIG Care Auto",
  pilares: [
    {
      id: "pilar-1",
      title: "Gestão Completa do Processo",
      text: "Nós tratamos de toda a coordenação por ti. Contactamos oficinas, acompanhamos o progresso dos trabalhos, procuramos peças, gerimos fornecedores e mantemos-te informado em cada etapa. Em vez de perderes horas ao telefone e em deslocações, tens um único ponto de contacto que resolve tudo por ti.",
      footerText: "Coordenação Integral"
    },
    {
      id: "pilar-2",
      title: "Controlo e Transparência",
      text: "Trabalhamos apenas com parceiros cuidadosamente selecionados. Recebes cotações detalhadas, recomendações transparentes e nenhuma compra ou intervenção é realizada sem a tua aprovação prévia. Sabes sempre quem está a fazer o quê, quanto custa e porquê.",
      footerText: "Segurança e Confiança"
    },
    {
      id: "pilar-3",
      title: "Rastreabilidade Operacional",
      text: "Toda a informação fica centralizada e documentada. Tens acesso ao histórico das intervenções, registos de manutenção, relatórios finais e acompanhamento contínuo da viatura. Cada processo é gerido de forma estruturada para que nada seja esquecido ou perdido.",
      footerText: "Controlo Total"
    },
    {
      id: "pilar-4",
      title: "Continuidade Operacional",
      text: "Reuniões, escola, trabalho, compromissos — nada espera pela reparação. A SIG coordena uma viatura de substituição enquanto a tua está em manutenção. Tens diversas opções disponíveis. A vida continua.",
      footerText: "Mobilidade alternativa"
    }
  ] as Pilar[]
};

export const comoFuncionaSection = {
  title: "Como funciona",
  subtitle: "Simples de começar. Nós tratamos da complexidade.",
  steps: [
    {
      step: 1,
      title: "Conta-nos o problema",
      text: "Manda mensagem no WhatsApp. Descreve o que está a acontecer — fotos, sintomas, urgência. Não precisas de saber de mecânica."
    },
    {
      step: 2,
      title: "Nós analisamos e propomos",
      text: "A SIG avalia, contacta os parceiros certos e apresenta-te uma abordagem clara — com custos separados e sem surpresas."
    },
    {
      step: 3,
      title: "Tu aprovas, nós gerimos",
      text: "Só avançamos com a tua aprovação. Depois acompanhamos tudo e mantemos-te informado — até ao relatório final."
    },
    {
      step: 4,
      title: "Problema resolvido",
      text: "Recebe o resultado sem ter perdido tempo a gerir oficinas, mecânicos ou fornecedores. Isso é connosco."
    }
  ] as ProcessStep[]
};

export const paraQuemSection = {
  title: "Para quem o tempo tem valor.",
  subtitle: "Não importa se tens um carro ou uma frota. O que importa é que não queres gastar o teu tempo a gerir a complexidade automóvel.",
  perfis: [
    {
      id: "perfil-1",
      title: "Profissionais e Empresários",
      text: "A tua agenda é o teu activo mais precioso. Gestores, consultores, médicos, empreendedores — pessoas que sabem que o tempo perdido numa oficina tem um custo real. Foca-te no que só tu podes fazer. O resto é connosco.",
      tag: "DESCENTRALIZAÇÃO"
    },
    {
      id: "perfil-3",
      title: "Tens viaturas. Precisas de quem as gira.",
      text: "2 ou 10 viaturas — sem gestor de frota dedicado, a manutenção fica ao acaso. A SIG assume essa função, com processo documentado e relatórios mensais.",
      tag: "EMPRESAS E PME"
    },
    {
      id: "perfil-4",
      title: "Processo, documentação, transparência.",
      text: "Cotações formais, relatórios para auditoria, fornecedores verificáveis. A SIG entrega o que os doadores e auditores precisam de ver.",
      tag: "ONGS E PROJECTOS"
    },
    {
      id: "perfil-2",
      title: "Uma chamada resolve.",
      text: "Quando o carro tem problema, não precisas de entrar em pânico nem de saber de mecânica. Conta-nos o que se passa e nós tratamos.",
      tag: "FAMÍLIAS"
    }
  ] as ClientProfile[]
};

export const pacotesSection = {
  title: "Escolhe o nível de apoio que precisas.",
  subtitle: "Preços transparentes. A taxa da SIG é sempre separada dos custos de oficina e peças — sabes exactamente o que pagas e a quem.",
  plans: [
    {
      id: "basico",
      name: "Básico — Assist",
      price: "8.500 MZN",
      includes: [
        "Coordenação de serviços de manutenção rotineira — troca de óleo, filtros, revisões periódicas e verificações preventivas",
        "A SIG marca o serviço, acompanha a execução e confirma a conclusão"
      ],
      forWho: "Clientes que querem manter a viatura em dia sem perder tempo a coordenar oficinas para serviços regulares e previsíveis. Problemas simples.",
      ctaText: "Básico: Começar — WhatsApp"
    },
    {
      id: "standard",
      name: "Standard",
      price: "16.500 MZN",
      includes: [
        "Triagem completa",
        "Marcação com oficina",
        "Acompanhamento do diagnóstico",
        "Cotação detalhada",
        "Actualizações regulares",
        "Relatório de fecho"
      ],
      forWho: "Clientes que querem gestão completa do caso.",
      ctaText: "Standard: Começar — WhatsApp"
    },
    {
      id: "premium",
      name: "Premium — Concierge",
      price: "24.500 MZN",
      includes: [
        "Tudo do Standard",
        "Procurement de peças",
        "Comparação de opções",
        "Coordenação RSA",
        "Relatório detalhado",
        "Prioridade de atendimento"
      ],
      forWho: "Conveniência total, casos complexos, envolvimento RSA.",
      ctaText: "Premium: Começar — WhatsApp"
    },
    {
      id: "corporate",
      name: "Corporate",
      price: "30.000–80.000 MZN/mês",
      includes: [
        "Cadastro de viaturas",
        "Plano de manutenção",
        "Coordenação de oficinas",
        "Procurement",
        "Relatórios mensais",
        "Apoio a motoristas",
        "Atendimento prioritário"
      ],
      forWho: "Empresas PME, ONGs e projectos com 2+ viaturas.",
      ctaText: "Corporate: Solicitar proposta"
    }
  ] as PricingPlan[],
  footerNote: "A taxa SIG é sempre separada dos custos de oficina, peças e logística. Aprovação prévia obrigatória antes de qualquer despesa."
};

export const diferenciaisSection = {
  title: "O que nos diferencia",
  subtitle: "Qualquer pessoa conhece um mecânico. O que a SIG oferece é diferente.",
  items: [
    {
      id: "dif-1",
      title: "Processo profissional",
      text: "Ficha de atendimento, cotação detalhada, aprovação prévia, acompanhamento e relatório final. Em cada caso, sem excepção."
    },
    {
      id: "dif-2",
      title: "Rede verificada",
      text: "Parceiros em Moçambique e na África do Sul — seleccionados por reputação, qualidade e transparência."
    },
    {
      id: "dif-3",
      title: "Comunicação proactiva",
      text: "Nunca precisarás de perguntar como está o teu carro. A SIG actualiza-te antes de precisares de pedir."
    },
    {
      id: "dif-4",
      title: "Transparência total",
      text: "A taxa SIG é sempre separada. Mostramos opções, explicamos custos e não compramos nada sem a tua aprovação."
    },
    {
      id: "dif-5",
      title: "Acesso à rede RSA",
      text: "Para peças originais ou serviços especializados, coordenamos soluções na África do Sul."
    },
    {
      id: "dif-6",
      title: "A SIG não é oficina",
      text: "Somos gestores do processo. Trabalhamos para ti, não para a oficina. A nossa lealdade é contigo."
    }
  ] as Differentiator[]
};

export const ctaSection = {
  title: "O próximo passo é simples.",
  subtitle: "Conta-nos o problema da tua viatura. Analisamos, apresentamos uma solução e só avançamos com a tua aprovação.",
  reassurance: "Comprometidos com a eficiência · Resposta em menos de 2 horas"
};

export const rodapeSection = {
  brand: "SIG Care Auto",
  legalName: "SIG — Serviços Integrados de Gestão Operacional, SA",
  details: {
    telephones: ["+258878798922"],
    emails: ["careauto@opssig.com"],
    address: "Caniço Mall, 008, Rua Gare de Mercadorias, Polana Caniço A, Maputo",
    hours: "Segunda a Sexta: 08:00 - 17:30"
  }
};
