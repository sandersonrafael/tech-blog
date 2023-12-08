'use client';

import { useContext, useEffect } from 'react';
import { useParams } from 'next/navigation';

import PostList from '@/components/PostList';
import PostsContext from '@/contexts/PostsContext';

const TagsPage = () => {
  const { posts } = useContext(PostsContext);
  const urlTag = decodeURIComponent(useParams().tag as string);

  const postsWithTag = posts.filter(({ tags }) => {
    return tags.map(({ tag }) => tag.toLowerCase()).indexOf(urlTag.toLowerCase()) !== -1;
  });

  useEffect(() => scrollTo({ top: 0, behavior: 'smooth' }), []);

  return (
    <PostList posts={postsWithTag} title={urlTag} sort="newest" noResults="Não foram encontrados Posts com a tag especificada" />
  );
};

export default TagsPage;
