import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from './HeaderNav';
import IconMoon from '@/icons/IconMoon';
import IconSearch from '@/icons/IconSearch';
import IconPerson from '@/icons/IconPerson';

const LayoutHeader = () => {
  return (
    <header>
      <nav className="container mx-auto xl:max-w-6xl px-3 md:px-6 text-sm">
        <div className="flex content-center justify-between py-5">
          <Link href="/" className="my-auto shrink-0">
            <Image src="/imgs/logo.png" alt="All Tech Blog" width={260} height={100} className="w-28" priority />
          </Link>

          <div className="my-auto flex gap-6">
            <form className="flex content-center justify-center  max-sm:hidden">
              <input
                type="text"
                className="px-3 py-1 w-40 text-xs outline-none border-b"
                placeholder="O que você procura?"
                required
              />
              <button className="ml-2 mr-1 -scale-x-100 hover:-scale-110 hover:scale-y-110 duration-300">
                <IconSearch width={22} height={22} />
              </button>
            </form>

            <button>
              <IconMoon
                className="hover:scale-110 transition-all duration-300"
                width={20}
                height={20}
              />
            </button>

            <button>
              <IconPerson width={24} height={24} className="hover:scale-110 transition-all duration-300" />
            </button>
          </div>
        </div>

        <hr className="bg-gray-100 -mx-1 md:-mx-3" />

        <HeaderNav />
      </nav>
    </header>
  );
};

export default LayoutHeader;
