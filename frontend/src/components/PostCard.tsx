import IconCalendar from '@/icons/IconCalendar';
import IconEye from '@/icons/IconEye';
import IconHeart from '@/icons/IconHeart';
import PostCard from '@/types/PostCard';
import Image from 'next/image';
import Link from 'next/link';

const featuredImage: string = '/featured-post-temp-img.jpg';
const imageTitle: string = 'Não sei o quê e num sei o quê mais lá';
const tags: string[] = ['JavaScript', 'Front-end', 'React', 'TypeScript'];
const title: string = 'Como fazer modificações no seu código JavaScript com o auxílio do ChatGPT para tirar o máximo proveito e aprendizado';
const url: string = '/';
const date: string = '06/01/2023';
const views: number = 436;
const description: string = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio architecto voluptatibus id molestiae voluptate dicta dolorem ipsa corrupti animi placeat, quibusdam soluta, aspernatur sapiente facilis temporibus eos! Eligendi, sed perspiciatis.';
const likes: number = 332;

const maxLen = (description: string): number => {
  return description ? 60 : 80;
};

const PostCard = ({}: PostCard) => {
  return (
    <div className="
      flex flex-col shadow-lg shadow-gray-300 rounded-2xl overflow-hidden
      h-full transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-400 duration-300
    ">
      <Link href={url}>
        <Image
          className="w-full"
          src={featuredImage}
          alt={imageTitle}
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

        <div className="flex">
          <h3 className="text-lg font-black">
            <Link href={url}>
              {title.length > maxLen(description)
                ? title.slice(0, maxLen(description)) + '...'
                : title}
            </Link>
          </h3>
        </div>

        {description &&
          <div className="text-xs pt-2 pb-5">
            <p>{description.length > 200 ? description.slice(0, 200) + '...' : description}</p>
          </div>
        }

        <div className="mt-auto flex gap-3 text-sm">
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
