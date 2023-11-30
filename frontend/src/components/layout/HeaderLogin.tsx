import { useState } from 'react';

import IconPerson from '@/icons/IconPerson';
import IconClose from '@/icons/IconClose';
import AuthForm from '../forms/AuthForm';

const HeaderLogin = () => {
  const [menuView, setMenuView] = useState<boolean>(false);

  const changeMenuView = () => {
    setMenuView(!menuView);
  };

  return (
    <>
      <button onClick={changeMenuView}>
        <IconPerson width={24} height={24} className="hover:scale-110 transition-all duration-300" />
      </button>

      <aside className={`${menuView ? 'z-20' : 'opacity-0 -z-50'} fixed top-0 right-0 -bottom-24 w-full`}>
        <div
          className="absolute top-0 -bottom-12 w-full bg-black opacity-50"
          onClick={changeMenuView}
        ></div>
        <div
          className={`
            absolute right-0 h-screen bg-white w-full max-w-sm transition-all
            duration-500 ${menuView ? 'mr-0' : '-mr-96'} overflow-auto
          `}
        >
          <button
            className="flex p-1 mt-3 mr-3 ml-auto transition-all duration-300 hover:scale-110"
            onClick={changeMenuView}
          >
            <IconClose
              width={36}
              height={36}
            ></IconClose>
          </button>

          <div className="p-5">
            <AuthForm />
          </div>
        </div>
      </aside>
    </>
  );
};

export default HeaderLogin;
