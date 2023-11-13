import IconClose from '@/icons/IconClose';
import IconHamburgerMenu from '@/icons/IconHamburgerMenu';

type IconHamburger = {
  handleClick: () => void;
  className?: string;
  btnType: 'hamburger' | 'close';
};

const HeaderHamburgerBtn = ({ handleClick, className, btnType }: IconHamburger) => {
  return (
    <button
      onClick={handleClick}
      className={`${className}
          inline-block sm:hidden transition-all hover:scale-110 hover:text-blue-400 duration-300
        `}
    >
      {btnType === 'hamburger' &&
        <IconHamburgerMenu width={36} height={36} />
      }
      {btnType === 'close' &&
        <IconClose width={36} height={36} />
      }
    </button>
  );
};

export default HeaderHamburgerBtn;
