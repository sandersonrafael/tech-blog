import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';

import IconSearch from '@/icons/IconSearch';

const SearchBar = ({ className = '', handleCloseMenu }: { className: string, handleCloseMenu?: () => void }) => {
  const { push } = useRouter();

  const [search, setSearch] = useState<string>('');

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleCloseMenu && handleCloseMenu();

    const pathVariable = encodeURIComponent(search ? search : ' ');
    push(`/search/${pathVariable}`);
  };

  return (
    <form onSubmit={handleSearch} className={`flex content-center border-b py-1 justify-center ${className}`}>
      <input
        type="text"
        className="pl-1 mr-2 py-1 outline-none text-inherit w-full"
        placeholder="O que você procura?"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <button type="submit" className="mr-1 -scale-x-100 hover:-scale-110 hover:scale-y-110 duration-300">
        <IconSearch width={22} height={22} />
      </button>
    </form>
  );
};

export default SearchBar;
