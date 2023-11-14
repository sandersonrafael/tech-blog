'use client';

import { Dispatch, SetStateAction, useState } from 'react';

const getPages = (arrLength: number, interval: number): number[] => {
  const pagesArray: number[] = [];
  pagesArray.length = Math.ceil(arrLength / interval);
  return pagesArray.fill(0).map((_item, index) => index + 1);
};

const Pagination = (
  { anyArray, interval, selectedPage, selectPage }:
  { anyArray: unknown[], interval: number, selectedPage: number, selectPage: Dispatch<SetStateAction<number>> }
) => {
  const [pages] = useState<number[]>(getPages(anyArray.length, interval));

  return (
    <div className="flex gap-2 sm:gap-3 justify-center mb-6">
      {pages.map((currentPage) => (
        <div
          className={`
            flex items-center justify-center rounded-full hover:drop-shadow-xl transition-all duration-300
            shadow-md ${selectedPage === currentPage ? 'bg-blue-400 text-white' : 'bg-white'}
          `}
          key={currentPage}
        >
          <button className="w-10 h-10 sm:w-9 sm:h-9  rounded-full" onClick={() => selectPage(currentPage)}>
            {currentPage}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
