import PageLink from '@/types/PageLink';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const quickLinks: PageLink[] = [
  { name: 'Sobre Mim', url: `${appUrl}/pages/about-me` },
  { name: 'Política de Privacidade', url: `${appUrl}/pages/privacity-policy` },
  { name: 'Política de Cookies', url: `${appUrl}/pages/cookies-policy` },
  { name: 'Entre em Contato', url: `${appUrl}/pages/contact` },
];

export default quickLinks;
