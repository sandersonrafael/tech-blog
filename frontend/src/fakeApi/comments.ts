import Comment from '@/types/Comment';

const comments: Comment[] = [
  { id: 1, authorId: 2, postId: 1, content: 'Eu concordo completamente! No passado, tive o mesmo problema e acho que com o passar dos anos vem se tornando mais fácil lidar com isso!', createdAt: new Date(2023, 8, 30), lastModify: new Date(2023, 8, 30), likes: 11, dislikes: 1 },
  { id: 2, authorId: 1, postId: 4, content: 'Nossa, perfeito! Estava travado e esse guia me ajudou muito. Muito obrigado!', createdAt: new Date(2023, 7, 30), lastModify: new Date(2023, 7, 30), likes: 11, dislikes: 1 },
  { id: 3, authorId: 3, postId: 8, content: 'Desde quando? Aqui na empresa a gente nunca utilizou isso...', createdAt: new Date(2023, 10, 3), lastModify: new Date(2023, 10, 3), likes: 11, dislikes: 1 },
  { id: 3, authorId: 1, postId: 9, content: 'Hahaha... Que brilhante, cara! É a primeira vez que vejo alguém fazendo assim. Funcionou perfeitamente', createdAt: new Date(2023, 8, 29), lastModify: new Date(2023, 8, 29), likes: 11, dislikes: 1 },
];

export default comments;
