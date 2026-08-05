export const SITE = {
  name: 'LR Bartenders',
  url: 'https://lrbartenders.com.br',
  slogan: 'Sua festa merece o melhor!',
  tagline: 'Os melhores bartenders de Campinas e região',
  city: 'Campinas e região',
  founded: 2012,
  phone: '(19) 3367-7990',
  phoneHref: 'tel:+551933677990',
  whatsapp: '5519991151819',
  whatsappDisplay: '(19) 99115-1819',
  whatsappSecondary: '(19) 98433-4662',
  email: 'contato@lrbartenders.com.br',
  instagram: '@lrbartenders',
  instagramUrl: 'https://www.instagram.com/lrbartenders/',
  facebookUrl: 'https://www.facebook.com/lrbartenders/',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Cardápio', href: '/cardapio' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Contato', href: '/contato' },
] as const;

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
