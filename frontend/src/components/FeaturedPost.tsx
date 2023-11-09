import Link from 'next/link';

const featuredImage = '/featured-post-temp-img.jpg';
const tags: string[] = ['JavaScript', 'Front-end', 'React', 'TypeScript'];
const title: string = 'Como fazer modificações no seu código JavaScript com o auxílio do ChatGPT para tirar o máximo proveito e aprendizado';
const url: string = '/';
const date: string = '06/01/2023';
const views: number = 436;

const FeaturedPost = () => {
  return (
    <Link href={url}>
      <div
        style={{ backgroundImage: `url(${featuredImage})`, backgroundSize: 'cover' }}
        className="flex rounded-2xl w-full text-white"
      >
        <div style={{ paddingBottom: '50%' }}></div>

        <div className="mt-auto flex flex-col gap-3 px-7 py-5 text-sm text-gray-100">
          <div className="flex">
            {tags.map((tag, index) => index <= 2 && (
              <div key={tag}>{index > 0 ? ', ' : 'Tags: '}{tag}{index === 2 && '...'}</div>
            ))}
          </div>

          <div className="flex">
            <h3 className="text-2xl font-black">
              {title.length > 80 ? title.slice(0, 100) + '...' : title}
            </h3>
          </div>

          <div className="pt-1 flex gap-4 text-sm text-gray-100">
            <span>{date}</span>
            <span>|</span>
            <span>{views} {views !== 1 ? 'visualizações' : 'visualização'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPost;
