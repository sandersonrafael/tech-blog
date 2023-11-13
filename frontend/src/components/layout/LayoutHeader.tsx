import logo from '@/imgs/temp-logo.jpg';
import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from './HeaderNav';

const LayoutHeader = () => {
  return (
    <header>
      <nav className="container mx-auto xl:max-w-6xl px-3 md:px-6 text-sm">
        <div className="flex content-center justify-between py-5">
          <Link href="/" className="my-auto">
            <Image src={logo} alt="temp logo" className="w-28" priority />
          </Link>

          <div className="my-auto flex gap-4">
            <label className="flex content-center justify-center">
              <input type="text" className="border border-r-0 border-gray-300 rounded-s-md px-2 py-1 w-40 text-xs" placeholder="O que você procura?" />
              <button className="border border-gray-300 rounded-e-md px-2 py-1 my-auto">botao</button>
            </label>

            <button>claro/escuro</button>

            <button>Entrar</button>
          </div>
        </div>

        <hr className="bg-gray-100 -mx-1 md:-mx-3" />

        <HeaderNav />
      </nav>
    </header>
  );
};

export default LayoutHeader;
