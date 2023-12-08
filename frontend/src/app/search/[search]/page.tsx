'use client';

import PostList from '@/components/PostList';
import PostsContext from '@/contexts/PostsContext';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

const SearchPage = () => {
  const { posts } = useContext(PostsContext);
  const userSearch = useParams().search as string;

  const postsResults = [...posts].filter(({ title }) => {
    return title.toLowerCase().indexOf(decodeURIComponent(userSearch).toLowerCase()) !== -1;
  });

  return (
    <PostList posts={postsResults} title="Resultados da Pesquisa:" sort="newest" noResults="Nenhum Post encontrado" />
  );
};

export default SearchPage;
