import IconCalendar from '@/icons/IconCalendar';
import IconEye from '@/icons/IconEye';
import IconHeart from '@/icons/IconHeart';
import Post from '@/types/entities/Post';
import dateFormatter from '@/utils/dateFormatter';
import Image from 'next/image';
import Link from 'next/link';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const HorizontalPostCard = ({ thumb, thumbAlt, tags, title, postUrl, createdAt, views, usersLikes }: Post) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12 sm:mb-10 w-full">
      <Link
        href={`${appUrl}/posts/${postUrl || ''}`}
        className="overflow-hidden rounded-md max-sm:max-h-32 flex items-center justify-center"
      >
        <Image
          src={thumb}
          alt={thumbAlt}
          width={640}
          height={360}
          className="transition-all hover:scale-105 rounded-md duration-300"
        />
      </Link>

      <div className="flex flex-col justify-center gap-2 sm:col-span-2">
        <div className="text-xs">
          Tags:{' '}
          {tags.map(({ id, tag }, index) => index <= 2 && (
            <span key={id}>{index > 0 && ', '}{tag}{index === 2 && '...'}</span>
          ))}
        </div>

        <h3 className="
          text-base font-bold text-gray-800
          hover:text-blue-400 transition-colors duration-300"
        >
          <Link href={`${appUrl}/posts/${postUrl || ''}`}>
            {title.length > 79
              ? title.slice(0, 79) + '...'
              : title}
          </Link>
        </h3>

        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-2">
            <IconCalendar />
            {createdAt && dateFormatter.ddMMyyyy(createdAt)}
          </span>

          <span>|</span>

          <span className="flex items-center gap-2">
            <IconEye className="text-lg" />
            {views}
          </span>

          <span>|</span>

          <span className="flex items-center gap-2">
            <IconHeart width={18} height={18} />
            {usersLikes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalPostCard;
