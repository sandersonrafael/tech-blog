'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from '../Modal';
import IconCheck from '@/icons/IconCheck';
import validator from 'validator';
import api from '@/api/api';
import Loading from '../Loading';

const NewsletterForm = () => {
  const [showSubscribeConfirm, setShowSubscribeConfirm] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('Seu melhor e-mail...');
  const [email, setEmail] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const resetPlaceholder = () => placeholder !== 'Seu melhor e-mail...' && setPlaceholder('Seu melhor e-mail...');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    resetPlaceholder();

    if (!validator.isEmail(email)) {
      setEmail('');
      setPlaceholder('E-mail inválido');
      return;
    }

    setLoading(true);
    await api.subscribeNewsletter(email);

    setLoading(false);
    setEmail('');
    setShowSubscribeConfirm(true);
  };

  return (
    <>
      <Modal showModal={showSubscribeConfirm} setShowModal={setShowSubscribeConfirm}>
        <div className="flex flex-col gap-2 text-center text-sm">
          <p className="py-1">Usuário cadastrado com sucesso em nossa Newsletter</p>
          <p className="py-1">Agora você ficará por dentro de todas as novidades!</p>
          <IconCheck width={48} height={48} color="green" className="mx-auto" />
        </div>
      </Modal>

      <form className="grid grid-cols-3 w-full" onSubmit={submit}>
        <input
          className={`
            p-3 px-4 rounded-l-full border border-gray-300 outline-none col-span-2 text-xs
            ${placeholder === 'Seu melhor e-mail...' ? '' : 'placeholder:text-red-400'} h-10
          `}
          type="email"
          name="email"
          placeholder={placeholder}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => { resetPlaceholder(); setEmail(e.target.value); }}
          required
        />
        <button
          className="
            rounded-r-full text-white font-semibold bg-blue-400 hover:bg-blue-500
            transition-colors duration-300 col-span-1 flex items-center justify-center
          "
          type="submit"
        >
          {loading
            ? <span className="mr-1 flex my-auto">
              <Loading diameter={16} color="white" />
            </span>
            : <span>Enviar</span>
          }
        </button>
      </form>
    </>
  );
};

export default NewsletterForm;
