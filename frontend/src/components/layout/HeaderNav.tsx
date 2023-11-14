'use client';

import headerLinks from '@/static/headerLinks';
import Link from 'next/link';
import { Github, Linkedin } from '../SocialLinks';
import { MouseEvent, useRef, useState } from 'react';
import HeaderHamburgerBtn from './HeaderHamburgerBtn';
import Image from 'next/image';
import SearchBar from './SearchBar';

const HeaderNav = () => {
  const [menuVisibility, setMenuVisibility] = useState<string>('max-sm:-left-full');
  const [navBg, setNavBg] = useState<string>('max-sm:transparent');

  const div = useRef<HTMLDivElement>(null);

  const handleMenuView = () => {
    if (menuVisibility === 'max-sm:-left-full') {
      setMenuVisibility('max-sm:left-0');
      setTimeout(() => setNavBg('max-sm:bg-black'), 300);
    } else {
      setMenuVisibility('max-sm:-left-full');
      setNavBg('max-sm:transparent');
    }
  };

  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === div.current) handleMenuView();
  };

  return (
    <div className="flex content-center justify-between py-3">
      <HeaderHamburgerBtn handleClick={handleMenuView} btnType="hamburger" />
      <div className={`
          max-sm:fixed max-sm:top-0 max-sm:-bottom-20 max-sm:right-0 max-sm:w-full
          max-sm:bg-opacity-80 ${menuVisibility} ${navBg} transition-all duration-500
        `}
      ref={div}
      onClick={(e) => handleClickOutside(e)}
      >
        <ul className="flex gap-4 flex-row h-full items-center relative
          max-sm:flex-col max-sm:text-xl max-sm:bg-white max-sm:pt-16 max-sm:gap-8 max-sm:max-w-xs
        ">
          <Link href="/" className="">
            <Image
              className="w-28 absolute top-0 left-0 mt-6 ml-6 sm:hidden"
              src="/imgs/logo.png"
              alt="All Tech Blog"
              width={260}
              height={100}
              priority
            />
          </Link>

          <HeaderHamburgerBtn
            handleClick={handleMenuView}
            className="absolute top-0 right-0 p-2 m-4"
            btnType="close"
          />

          <SearchBar className="sm:hidden text-md mx-6" />

          <li className="hover:text-blue-400 transition-colors duration-300 sm:mr-6">
            <Link href="/">Home</Link>
          </li>

          {headerLinks.map(({ name, url }) => (
            <li key={name} className="hover:text-blue-400 transition-colors duration-300">
              <Link href={url}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="my-auto">
        <ul className="flex gap-4">
          <Linkedin className="" width={28} />
          <Github className="" width={28} />
        </ul>
      </div>
    </div>
  );
};

export default HeaderNav;
