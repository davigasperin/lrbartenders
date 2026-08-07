export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
};

export type Menu = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
};

export const ABOUT = {
  title: 'Coquetelaria Premium de outro nível',
  lead: 'Somos um serviço sofisticado e versátil associado a uma Coquetelaria Premium apresentada de forma clássica ou interativa.',
  paragraphs: [
    'Criada em 2012, a LR Bartenders é referência em festas e eventos em Campinas e no interior paulista. Nossos bartenders são altamente capacitados, corteses e profissionais, prontos para interagir com o público e eternizar momentos inesquecíveis.',
    'Com uma variada carta de drinks e os principais cocktails — internacionais, caipirinhas clássicas e gourmet, além de mixologia molecular — nosso objetivo é estimular os sentidos de cada convidado, oferecendo uma experiência sensorial inigualável.',
  ],
  stats: [
    { value: '2012', label: 'Ano de fundação' },
    { value: '+1200', label: 'Eventos realizados' },
    { value: '100%', label: 'Satisfação' },
  ],
  image: '/images/sobre-quem-somos.jpg',
};

export const SERVICES: Service[] = [
  {
    id: 'lr-premium',
    title: 'LR Premium',
    description:
      'Carta de coquetéis totalmente premium, com apresentação diferenciada em taças, canecas e utensílios especiais para coquetéis clássicos, internacionais e exclusivos.',
    image: '/images/servico-premium.jpg',
    icon: 'crown',
  },
  {
    id: 'lr-choco',
    title: 'LR Choco',
    description:
      'A cascata de chocolate com fondue de puro cacau — uma sobremesa irresistível para deixar seus convidados com água na boca.',
    image: '/images/servico-choco.jpg',
    icon: 'chocolate',
  },
  {
    id: 'lr-coffee',
    title: 'LR Coffee',
    description:
      'Baristas requintados com cafés especiais 100% Arábica: espresso, cappuccinos, frappuccinos, bebidas geladas e coquetéis alcoólicos à base de café.',
    image: '/images/servico-coffee.jpg',
    icon: 'coffee',
  },
  {
    id: 'bar-acai',
    title: 'Bar de Açaí',
    description:
      'A primeira empresa de Campinas e região a lançar o açaí itinerante para eventos. Leve essa delícia para o seu evento.',
    image: '/images/servico-acai.jpg',
    icon: 'acai',
  },
  {
    id: 'bar-gin',
    title: 'Bar de Gin',
    description:
      'Gins premium com tônicas artesanais, guarnições frescas e apresentação sofisticada para uma experiência refinada.',
    image: '/images/servico-gin.jpg',
    icon: 'gin',
  },
  {
    id: 'festival-caipirinhas',
    title: 'Festival de Caipirinhas',
    description:
      'Caipirinhas clássicas e gourmet com frutas da estação, releituras autorais e o toque da melhor coquetelaria brasileira.',
    image: '/images/servico-caipirinha.jpg',
    icon: 'caipirinha',
  },
];

export const MENUS: Menu[] = [
  {
    id: 'festival-caipirinhas',
    number: '01',
    title: 'Festival de Caipirinhas',
    description:
      'Caipirinhas clássicas e gourmet com frutas da estação e releituras autorais exclusivas.',
    image: '/images/menu-festival.jpg',
  },
  {
    id: 'old-ideale',
    number: '02',
    title: 'Old Ideale',
    description:
      'Manhattans, Old Fashioneds, Vieux Carrés e Sazeracs — os coquetéis mais tradicionais e elegantes do mundo.',
    image: '/images/menu-old-ideale.jpg',
  },
  {
    id: 'classicos-atuais',
    number: '03',
    title: 'Clássicos Atuais',
    description:
      'Releituras contemporâneas dos grandes clássicos, incluindo nossa mixologia molecular.',
    image: '/images/menu-classicos.jpg',
  },
  {
    id: 'bar-gin',
    number: '04',
    title: 'Bar de Gin',
    description:
      'Gins premium com tônicas artesanais e guarnições frescas em apresentação sofisticada.',
    image: '/images/menu-gin.jpg',
  },
  {
    id: 'fresh-sem-alcool',
    number: '05',
    title: 'Fresh Sem Álcool',
    description:
      'Águas aromatizadas e coquetéis refrescantes sem álcool para todos participarem da festa.',
    image: '/images/menu-fresh.jpg',
  },
  {
    id: 'premium-sem-alcool',
    number: '06',
    title: 'Premium Sem Álcool',
    description:
      'Drinks sem álcool premium, elaborados com a mesma sofisticação dos nossos coquetéis.',
    image: '/images/menu-premium-sem-alcool.jpg',
  },
];

export const GALLERY = [
  '/images/galeria-01.jpg',
  '/images/galeria-02.jpg',
  '/images/galeria-03.jpg',
  '/images/galeria-04.jpg',
  '/images/galeria-05.jpg',
  '/images/galeria-06.jpg',
  '/images/galeria-07.jpg',
  '/images/galeria-08.jpg',
  '/images/galeria-09.jpg',
];

export const ABOUT_PAGE = {
  history: {
    eyebrow: 'Nossa história',
    title: 'Uma jornada de sabor desde 2012',
    paragraphs: [
      'A LR Bartenders nasceu em 2012 com uma missão clara: elevar a coquetelaria a um novo patamar nas festas e eventos de Campinas e região. O que começou como um serviço diferenciado de bartenders tornou-se referência de sofisticação, versatilidade e atendimento impecável.',
      'Hoje somos um serviço sofisticado e versátil, associado a uma Coquetelaria Premium apresentada de forma clássica ou interativa. Nossos bartenders são altamente qualificados e corteses, sempre prontos para interagir com o público e eternizar momentos inesquecíveis.',
    ],
    image: '/images/topo-site-01.jpg',
    stats: [
      { value: '2012', label: 'Ano de fundação' },
      { value: '+1200 ', label: 'Eventos realizados' },
      { value: '100%', label: 'Satisfação' },
    ],
  },
  pillars: [
    {
      id: 'missao',
      title: 'Missão',
      text: 'Oferecer uma coquetelaria requintada e criativa, com sabor único, marcas conceituadas, insumos de alta qualidade e uma linha artesanal que encanta e surpreende.',
    },
    {
      id: 'diferencial',
      title: 'Diferencial',
      text: 'Bebidas personalizadas, atendimento clássico ou descontraído, e a interação dos bartenders com o público — transformando cada evento em uma experiência sensorial.',
    },
    {
      id: 'sucesso',
      title: 'Sucesso',
      text: 'Acreditamos em confiança e ética como base de tudo. Nosso reconhecimento vem de um cardápio renovado para cada época do ano e da fidelidade dos nossos clientes.',
    },
  ],
};

export type EventType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const EVENT_TYPES: EventType[] = [
  {
    id: 'casamentos',
    title: 'Casamentos',
    description:
      'Coquetelaria premium para o grande dia — do clássico ao interativo, eternizando cada momento com sofisticação.',
    image: '/images/topo-site-02.jpg',
  },
  {
    id: '15-anos',
    title: '15 Anos',
    description:
      'Uma festa inesquecível para celebrar a debutante, com bar de drinks, cascata de chocolate e muitas surpresas.',
    image: '/images/topo-site-03.jpg',
  },
  {
    id: 'corporativos',
    title: 'Corporativos',
    description:
      'Eventos, happy hours e confraternizações empresariais com atendimento impecável e marcas conceituadas.',
    image: '/images/topo-site-04.jpg',
  },
  {
    id: 'formaturas',
    title: 'Formaturas',
    description:
      'A celebração de uma conquista merece um serviço à altura: drinks clássicos, premium e sem álcool para todos.',
    image: '/images/galeria-08.jpg',
  },
  {
    id: 'aniversarios',
    title: 'Aniversários',
    description:
      'Aniversários memoráveis com a LR Bartenders: coquetelaria personalizada que anima e encanta todos os convidados.',
    image: '/images/galeria-05.jpg',
  },
  {
    id: 'e-mais',
    title: 'E mais',
    description:
      'Festas privadas, lançamentos, convenções e eventos exclusivos. Se a ocasião merece o melhor, a LR está lá.',
    image: '/images/servico-premium.jpg',
  },
];

export const MENU_ALCOHOL: Record<string, boolean> = {
  'festival-caipirinhas': true,
  'old-ideale': true,
  'classicos-atuais': true,
  'bar-gin': true,
  'fresh-sem-alcool': false,
  'premium-sem-alcool': false,
};

export const MENU_ITEMS: Record<string, string[]> = {
  'festival-caipirinhas': [
    'Caipirinha de Limão Tradicional',
    'Caipiroska de Frutas Vermelhas',
    'Caipirinha Gourmet de Morango',
    'Caipiríssima de Maracujá',
    'Caipiroska de Abacaxi com Hortelã',
  ],
  'old-ideale': [
    'Old Fashioned',
    'Manhattan',
    'Vieux Carré',
    'Sazerac',
    'Negroni Clássico',
  ],
  'classicos-atuais': [
    'Mojito Clássico',
    'Margarita Tradicional',
    'Moscow Mule',
    'Piña Colada',
    'Cosmopolitan',
  ],
  'bar-gin': [
    'Gin Tônica Clássica',
    'Gin Tônica de Frutas Vermelhas',
    'Gin Tônica Floral',
    'Gimlet de Pepino',
    'Gin Tônica Premium',
  ],
  'fresh-sem-alcool': [
    'Água Aromatizada de Pepino e Menta',
    'Virgin Mojito',
    'Citrus Cooler',
    'Fresh de Frutas Vermelhas',
    'Sparkling Tropical Zero',
  ],
  'premium-sem-alcool': [
    'Zero Aperol Spritz',
    'Sunset Zero',
    'Blue Lagoon Zero',
    'Tropical Elixir',
    'Pink Fizz Sem Álcool',
  ],
};

export const CTA = {
  title: 'Premium Open Bar para Festas e Eventos',
  subtitle:
    'Transforme o seu evento em uma experiência inesquecível. Fale com a gente e receba um orçamento personalizado.',
  primary: { label: 'Solicitar Orçamento', href: '/orcamento' },
  secondary: { label: 'Agende uma Degustação', href: '/contato' },
};
