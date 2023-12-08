import PageLink from '@/types/PageLink';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const headerLinks: PageLink[] = [
  { name: 'Todos os Posts', url: `${appUrl}/posts` },
  { name: 'Front-end', url: `${appUrl}/tags/Front-end` },
  { name: 'Back-end', url: `${appUrl}/tags/Back-end` },
  { name: 'JavaScript', url: `${appUrl}/tags/JavaScript` },
  { name: 'Java', url: `${appUrl}/tags/Java` },
];

export default headerLinks;
