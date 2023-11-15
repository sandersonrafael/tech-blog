import Post from '@/types/Post';

const mainPost: Post = {
  id: 999,
  thumb: '/imgs/featured-post-temp-img.jpg',
  thumbAlt: 'Imagem de thumb',
  miniature: '/imgs/temp-miniature.jpg',
  tags: ['JavaScript', 'Front-end', 'React', 'TypeScript'],
  title: 'Como fazer modificações no seu código JavaScript com o auxílio do ChatGPT para tirar o máximo proveito e aprendizado',
  description: '',
  postUrl: '/',
  createdAt: new Date(2023, 0, 6),
  updatedAt: new Date(2023, 0, 6),
  views: 436,
  likes: 35,
};

export default mainPost;
