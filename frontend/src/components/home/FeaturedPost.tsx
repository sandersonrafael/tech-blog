import IconCalendar from '@/icons/IconCalendar';
import IconEye from '@/icons/IconEye';
import IconHeart from '@/icons/IconHeart';
import Post from '@/types/entities/Post';
import dateFormatter from '@/utils/dateFormatter';
import Link from 'next/link';

const FeaturedPost = ({ thumb, tags, title, postUrl, createdAt, views, usersLikes, className = '' }: Post & { className: string}) => {
  return (
    <Link href={postUrl} className={className}>
      <div
        style={{ backgroundImage: `url(${thumb})`, backgroundSize: 'cover' }}
        className={`
          flex rounded-2xl text-white shadow-lg shadow-gray-300 h-full w-full
          transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-400 duration-300
        `}
      >
        <div style={{ paddingBottom: '56.25%' }}></div>

        <div className="mt-auto flex flex-col gap-2 sm:gap-3 px-7 py-5 text-2xs sm:text-sm text-gray-100">
          <div className="flex">
            {tags && tags.map(({ id, tag }, index) => index <= 2 && (
              <div key={id}>{index > 0 ? ', ' : 'Tags: '}{tag}{index === 2 && '...'}</div>
            ))}
          </div>

          <div className="flex">
            <h3 className="text-xs sm:text-base md:text-2xl font-black">
              {title && title.length > 80 ? title.slice(0, 80) + '...' : title}
            </h3>
          </div>

          <div className="pt-1 flex gap-4 text-2xs sm:text-xs md:text-sm text-gray-100">
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
              {usersLikes && usersLikes.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPost;
