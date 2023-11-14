import IconSearch from '@/icons/IconSearch';

const SearchBar = ({ className }: { className: string }) => {
  return (
    <form className={`flex content-center border-b py-1 justify-center ${className}`}>
      <input
        type="text"
        className="pl-1 mr-2 py-1 outline-none text-inherit w-full"
        placeholder="O que você procura?"
        required
      />
      <button className="mr-1 -scale-x-100 hover:-scale-110 hover:scale-y-110 duration-300">
        <IconSearch width={22} height={22} />
      </button>
    </form>
  );
};

export default SearchBar;
