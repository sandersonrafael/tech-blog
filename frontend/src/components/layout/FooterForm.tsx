'use client';

import { FormEvent } from 'react';

const FooterForm = () => {
  const submit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="grid grid-cols-3 w-full" onSubmit={submit}>
      <input
        className="p-3 px-4 rounded-l-full border border-gray-300 outline-none col-span-2"
        type="email"
        name="email"
        placeholder="Seu melhor e-mail..."
        required
      />
      <button
        className="
          py-3 px-4 rounded-r-full text-white font-semibold bg-blue-400 hover:bg-blue-500
          transition-colors duration-300 col-span-1
        "
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
};

export default FooterForm;
