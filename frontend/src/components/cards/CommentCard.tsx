import Comment from '@/types/entities/Comment';
import Image from 'next/image';

import dateFormatter from '@/utils/dateFormatter';
import Link from 'next/link';
import IconArrowRight from '@/icons/IconArrowRight';
import Post from '@/types/entities/Post';

const CommentCard = ({ content, createdAt, author, post }: Comment & { post: Post }) => {
  const { firstName, profileImg, lastName } = author;

  return (
    <div
      className="
        flex rounded-lg bg-white border p-6 mb-6 shadow hover:shadow-2xl
        transition-all hover:-translate-y-1 duration-300 relative
      "
    >
      <div className="overflow-hidden mr-5 h-full shrink-0">
        <Image
          className="rounded-full w-16 hover:scale-110 transition-all duration-500"
          src={profileImg}
          alt={`${firstName} ${lastName}`}
          width={240}
          height={240}
        />
      </div>

      <div className="w-full h-full">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-bold">{firstName.includes(' ') ? firstName.split(' ')[0] : firstName}</h3>
          <p className="ml-auto text-xs mt-1 mb-4">{dateFormatter.inFull(createdAt)}</p>
        </div>

        <p className="text-xs mb-4">{content.length > 200 ? content.slice(0, 200) + '...' : content}</p>
      </div>

      <Link
        className="
          absolute right-0 bottom-0 mr-3 mb-3 text-sm text-blue-400 hover:text-blue-600
          flex gap-1 items-center
        "
        href={post.postUrl}
      >
        <span className="underline">Ver post</span>
        <IconArrowRight />
      </Link>
    </div>
  );
};

export default CommentCard;
