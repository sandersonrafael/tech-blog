'use client';

import headerLinks from '@/static/headerLinks';
import Link from 'next/link';
import { Github, Linkedin } from '../SocialLinks';
import { MouseEvent, useRef, useState } from 'react';
import HeaderHamburgerBtn from './HeaderHamburgerBtn';

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
      <HeaderHamburgerBtn handleClick={handleMenuView} />
      <div className={`
          max-sm:fixed max-sm:top-0 max-sm:bottom-0 max-sm:right-0 max-sm:w-full
          max-sm:bg-opacity-70 ${menuVisibility} ${navBg} transition-all duration-500
        `}
      ref={div}
      onClick={(e) => handleClickOutside(e)}
      >
        <ul className="flex gap-4 flex-row h-full items-center relative
          max-sm:flex-col max-sm:text-xl max-sm:bg-white max-sm:pt-16 max-sm:gap-8 max-sm:max-w-sm
        ">
          <HeaderHamburgerBtn handleClick={handleMenuView} className="absolute top-0 right-0 pt-6 pr-6" />
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
          <Linkedin className="" width={26} />
          <Github className="" width={25} />
        </ul>
      </div>
    </div>
  );
};

export default HeaderNav;
