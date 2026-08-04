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
    { value: '+500', label: 'Eventos realizados' },
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

export const CTA = {
  title: 'Premium Open Bar para Festas e Eventos',
  subtitle:
    'Transforme o seu evento em uma experiência inesquecível. Fale com a gente e receba um orçamento personalizado.',
  primary: { label: 'Solicitar Orçamento', href: '/orcamento' },
  secondary: { label: 'Agende uma Degustação', href: '/contato' },
};
