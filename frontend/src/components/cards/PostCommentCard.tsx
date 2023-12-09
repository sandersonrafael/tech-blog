import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import IconLikeFill from '@/icons/IconLikeFill';
import IconLike from '@/icons/IconLike';
import IconDislikeFill from '@/icons/IconDislikeFill';
import IconDislike from '@/icons/IconDislike';
import IconThreeDots from '@/icons/IconThreeDots';
import IconPencil from '@/icons/IconPencil';
import IconTrash from '@/icons/IconTrash';
import UserContext from '@/contexts/UserContext';
import PostsContext from '@/contexts/PostsContext';
import Confirmation from '../Confirmation';

import dateFormatter from '@/utils/dateFormatter';
import api from '@/api/api';

import Comment from '@/types/entities/Comment';
import Post from '@/types/entities/Post';
import User from '@/types/entities/User';
import UserDetails from '@/types/entities/UserDetails';

const getJwt = () => localStorage.getItem('jwt') as string;

type PostCommentCardTypes = {
  actualComment: Comment;
  postId: number;
  deleteCommentFromPost: (commentId: number) => void; // eslint-disable-line no-unused-vars
};

const PostCommentCard = ({ actualComment, postId, deleteCommentFromPost }: PostCommentCardTypes) => {
  const { user, setUser } = useContext(UserContext);
  const { posts, setPosts, setComments } = useContext(PostsContext);

  const [comment, setComment] = useState<Comment>(actualComment);
  const [viewOptions, setViewOptions] = useState<boolean>(false);
  const [author, setAuthor] = useState<User>(actualComment.author);

  const [deletingComment, setDeletingComment] = useState<boolean>(false);

  const optionsView = () => { // TODO: Ver lógica para fechar automaticamente o menu ao clicar fora
    setViewOptions(!viewOptions);
  };

  const updatePostsCommentsAndUser = async (jwt: string) => {
    const updatedPosts = (await api.getAllPosts()).map((post) => {
      post.comments = post.comments.map((comment) => {
        comment.createdAt = new Date(comment.createdAt);
        comment.updatedAt = new Date(comment.updatedAt);
        return comment;
      });
      return post;
    });
    const updatedComments: Comment[] = [];
    updatedPosts.forEach((post) => post.comments.forEach((comment) => updatedComments.push(comment)));

    setPosts([...updatedPosts]);
    setComments([...updatedComments]);
    const updatedUserData = await api.getUserDetails(jwt) as UserDetails;
    if (updatedUserData.id) setUser({ ...updatedUserData });
  };

  const likeComment = async () => {
    if (!user) return; // TODO: Lógica para avisar que usuário precisa estar logado para curtir comentários

    if (getJwt()) {
      const { success } = await api.likeComment(comment.id, getJwt()) as { success: string };
      if (success) updatePostsCommentsAndUser(getJwt());
    }
  };

  const dislikeComment = async () => {
    if (!user) return; // TODO: Lógica para avisar que usuário precisa estar logado para curtir comentários

    if (getJwt()) {
      const { success } = await api.dislikeComment(comment.id, getJwt()) as { success: string };
      if (success) updatePostsCommentsAndUser(getJwt());
    }
  };

  const deleteComment = async () => {
    if (!user) return setDeletingComment(false);

    if (getJwt()) {
      const { success } = await api.deleteComment(comment.id, getJwt()) as { success: string };
      if (success) {
        await updatePostsCommentsAndUser(getJwt());
        deleteCommentFromPost(comment.id);
      }
    }
    setDeletingComment(false);
  };

  useEffect(() => {
    if (posts.length > 0) {
      const thisPost = posts.find((post) => post.id === postId) as Post;
      const thisComment = thisPost.comments.find((c) => c.id === comment.id) as Comment;
      if (!thisComment) return;

      setComment({ ...thisComment });
      setAuthor(thisComment.author);
    }
  }, [posts, postId, comment.id, setComment]);

  return (
    <div className="p-6 relative flex border shadow">
      <div className="overflow-hidden mr-5 h-full shrink-0">
        <Image
          className="rounded-full w-16 hover:scale-110 transition-all duration-500"
          src={author.profileImg}
          alt={`${author.firstName} ${author.lastName}`}
          width={240}
          height={240}
        />
      </div>

      <div className="w-full h-full">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-bold mb-3">{author.firstName}</h3>

          {(user && user.commentsIds.indexOf(comment.id) !== -1) &&
            <div className="absolute top-0 right-0 mr-2 mt-2" >
              <div
                className={`
                  absolute  h-7 bg-white bottom-0 -left-2  rounded shadow-md flex items-center justify-center gap-1
                  overflow-hidden transition-all duration-300 ${viewOptions ? 'w-16 -ml-16' : 'w-0 -ml-0'}
                `}
              >
                <button
                  className="p-1 transition-all hover:scale-110 duration-300 text-gray-700 hover:text-orange-400"
                  type="button"
                >
                  <IconPencil width={16} height={16} />
                </button>

                <button
                  className="p-1 transition-all hover:scale-110 duration-300 text-gray-700 hover:text-red-500"
                  type="button"
                  onClick={() => setDeletingComment(true)}
                >
                  <IconTrash width={16} height={16} />
                </button>

                <Confirmation
                  confirmAction={deleteComment}
                  setIsOpen={setDeletingComment}
                  isOpen={deletingComment}
                  confirmClass="bg-red-500 hover:bg-red-600 text-white"
                  message="Tem certeza que deseja apagar o comentário? Essa ação não poderá ser desfeita"
                  confirmMessage="Apagar"
                />
              </div>

              <button type="button" className="p-1 transition-transform hover:scale-110 duration-300">
                <IconThreeDots width={18} height={18} className="text-gray-600" onClick={optionsView} />
              </button>
            </div>
          }

          <p className="ml-auto text-xs mt-1 absolute left-4 bottom-0 mb-2">
            {dateFormatter.inFull(comment.createdAt)}
          </p>
        </div>

        <p className="text-xs mb-8">{comment.content}</p>
      </div>

      <div className="flex items-end gap-1 absolute bottom-0 right-0 mb-3 mr-4">
        <span className="text-xs">{comment.usersLikesIds.length}</span>

        <button
          className="mr-2 flex transition-all duration-300 hover:scale-110 hover:text-blue-500"
          onClick={likeComment}
          type="button"
        >
          {(user && user.commentsLikesIds.indexOf(comment.id) !== -1)
            ? <IconLikeFill width={24} height={24} className="text-blue-500" />
            : <IconLike width={24} height={24} />
          }
        </button>

        <span className="text-xs">{comment.usersDislikesIds.length}</span>

        <button
          className="mr-2 flex transition-all duration-300 hover:scale-110 hover:text-red-500"
          onClick={dislikeComment}
          type="button"
        >
          {(user && user.commentsDislikesIds.indexOf(comment.id) !== -1)
            ? <IconDislikeFill width={24} height={24} className="text-red-500" />
            : <IconDislike width={24} height={24} />
          }
        </button>
      </div>
    </div>
  );
};

export default PostCommentCard;
