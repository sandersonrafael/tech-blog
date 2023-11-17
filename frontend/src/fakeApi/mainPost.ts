import Post from '@/types/Post';

const mainPost: Post = {
  id: 999,
  thumb: '/imgs/featured-post-temp-img.jpg',
  thumbAlt: 'Imagem de thumb',
  miniature: '/imgs/temp-miniature.jpg',
  tags: [{ id: 1, tag: 'JavaScript' }, { id: 2, tag: 'Front-end' }, { id: 3, tag: 'React' }, { id: 4, tag: 'TypeScript' }],
  title: 'Como fazer modificações no seu código JavaScript com o auxílio do ChatGPT para tirar o máximo proveito e aprendizado',
  description: '',
  postUrl: '/',
  createdAt: new Date(2023, 0, 6),
  updatedAt: new Date(2023, 0, 6),
  views: 436,
  likes: 35,
};

export default mainPost;
