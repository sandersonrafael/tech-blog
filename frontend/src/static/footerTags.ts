import PageLink from '@/types/PageLink';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const tags: PageLink[] = [
  { name: 'JavaScript', url: `${appUrl}/tags/JavaScript` },
  { name: 'Java', url: `${appUrl}/tags/Java` },
  { name: 'Spring', url: `/tags/${encodeURIComponent('Spring Boot')}` },
  { name: 'MySQL', url: `${appUrl}/tags/MySQL` },
  { name: 'MongoDB', url: `${appUrl}/tags/MongoDB` },
  { name: 'React', url: `${appUrl}/tags/React` },
  { name: 'TypeScript', url: `${appUrl}/tags/TypeScript` },
  { name: 'Next', url: `${appUrl}/tags/Next` },
];

export default tags;
