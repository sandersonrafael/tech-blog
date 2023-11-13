import IconHamburgerMenu from '@/icons/IconHamburgerMenu';

const HeaderHamburgerBtn = ({ handleClick, className }: { handleClick: () => void, className?: string }) => {
  return (
    <button
      onClick={handleClick}
      className={`${className}
          inline-block sm:hidden transition-all hover:scale-110 hover:text-blue-400 duration-300
        `}
    >
      <IconHamburgerMenu width={28} height={28} />
    </button>
  );
};

export default HeaderHamburgerBtn;
