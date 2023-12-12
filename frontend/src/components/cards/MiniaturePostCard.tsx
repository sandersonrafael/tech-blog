import IconCalendar from '@/icons/IconCalendar';
import IconEye from '@/icons/IconEye';
import Post from '@/types/entities/Post';
import dateFormatter from '@/utils/dateFormatter';
import Image from 'next/image';
import Link from 'next/link';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const MiniaturePostCard = ({
  title,
  miniature,
  thumbAlt,
  postUrl,
  createdAt,
  views,
  miniatureType,
}: Post & { miniatureType: 1 | 2 }) => {
  return (
    <div
      className={`
        flex justify-between gap-3 transition-all duration-300 hover:-translate-y-1
        ${miniatureType === 1 &&
          'bg-white rounded-lg border shadow-sm p-6 flex-row-reverse hover:shadow-2xl'}
      `}
    >
      <Link href={`${appUrl}/posts/${postUrl || ''}`} className="my-auto w-20 h-20 shrink-0 block overflow-hidden rounded-md">
        <Image
          src={miniature}
          alt={thumbAlt}
          width={240}
          height={240}
          className="w-full rounded-md hover:scale-105 transition-all duration-300"
        />
      </Link>

      <div>
        <Link href={`${appUrl}/posts/${postUrl || ''}`}>
          <h3 className="font-medium text-sm hover:text-blue-400 pb-3 transition-colors duration-300">
            {title.length > 42 ? title.slice(0, 42) + '...' : title}
          </h3>
        </Link>

        <div className="flex text-xs gap-2 items-center">
          <span><IconCalendar /></span>
          <span>{createdAt && dateFormatter.ddMMyyyy(createdAt)}</span>
          <span>|</span>
          <span><IconEye /></span>
          <span>{views}</span>
        </div>
      </div>
    </div>
  );
};

export default MiniaturePostCard;
