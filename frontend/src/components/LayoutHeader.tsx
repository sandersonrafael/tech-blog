import logo from '@/imgs/temp-logo.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin } from './SocialLinks';
import headerLinks from '@/static/headerLinks';
import IconHamburgerMenu from '@/icons/IconHamburgerMenu';

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

        <div className="flex content-center justify-between py-3">
          <button className="
              inline-block sm:hidden transition-all hover:scale-110 hover:text-blue-400 duration-300
            "
          >
            <IconHamburgerMenu width={28} height={28} />
          </button>
          <div className="hidden sm:block my-auto">
            <ul className="flex gap-4">
              <li className="hover:text-blue-400 transition-colors duration-300 my-auto">
                <Link href="/" className="sm:mr-6">Home</Link>
              </li>

              {headerLinks.map(({ name, url }) => (
                <li key={name} className="hover:text-blue-400 transition-colors duration-300 my-auto">
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-auto">
            <ul className="flex gap-4">
              <Linkedin className="" width={26} />
              <Github className="" width={25} />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LayoutHeader;
