import IconCalendar from '@/icons/IconCalendar';
import IconEye from '@/icons/IconEye';
import IconHeart from '@/icons/IconHeart';
import PostCard from '@/types/Post';
import Image from 'next/image';
import Link from 'next/link';

const maxLen = (description: string): number => {
  return description ? 40 : 60;
};

const PostCard = ({ thumb, thumbAlt, tags, title, description, postUrl, date, views, likes, className }: PostCard & { className?: string }) => {
  return (
    <div className={`
      flex flex-col shadow-lg shadow-gray-300 rounded-2xl overflow-hidden h-full ${className}
      transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-400 duration-300
    `}>
      <Link href={postUrl}>
        <Image
          className="w-full"
          src={thumb}
          alt={thumbAlt}
          width={640}
          height={360}
        />
      </Link>
      <div className="flex flex-col bg-white p-6 gap-1 h-full">
        <div className="flex text-xs pb-2">
          {tags.map((tag, index) => index <= 2 && (
            <div key={tag}>{index > 0 && ', '}{tag}{index === 2 && '...'}</div>
          ))}
        </div>

        <div className="flex my-auto">
          <h3 className="text-base font-black">
            <Link href={postUrl}>
              {title.length > maxLen(description)
                ? title.slice(0, maxLen(description)) + '...'
                : title}
            </Link>
          </h3>
        </div>

        {description &&
          <div className="text-xs pt-2">
            <p>{description.length > 200 ? description.slice(0, 200) + '...' : description}</p>
          </div>
        }

        <div className="pt-5 mt-auto flex gap-3 text-xs">
          <span className="flex items-center gap-2">
            <IconCalendar />
            {date}
          </span>

          <span>|</span>

          <span className="flex items-center gap-2">
            <IconEye className="text-lg" />
            {views}
          </span>

          <span>|</span>

          <span className="flex items-center gap-2">
            <IconHeart width={18} height={18} />
            {likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
