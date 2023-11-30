import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from './HeaderNav';
import IconMoon from '@/icons/IconMoon';
import SearchBar from './SearchBar';
import HeaderLogin from './HeaderLogin';

const LayoutHeader = () => {
  return (
    <header>
      <nav className="container mx-auto xl:max-w-6xl px-3 md:px-6 text-sm">
        <div className="flex content-center justify-between py-5">
          <Link href="/" className="my-auto shrink-0">
            <Image src="/imgs/logo.png" alt="All Tech Blog" width={260} height={100} className="w-28" priority />
          </Link>

          <div className="my-auto flex gap-6">
            <SearchBar className="max-sm:hidden text-xs w-44" />

            <button>
              <IconMoon
                className="hover:scale-110 transition-all duration-300"
                width={20}
                height={20}
              />
            </button>

            <HeaderLogin />
          </div>
        </div>

        <hr className="bg-gray-100 -mx-1 md:-mx-3" />

        <HeaderNav />
      </nav>
    </header>
  );
};

export default LayoutHeader;
