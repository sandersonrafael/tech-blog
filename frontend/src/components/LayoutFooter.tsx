import { Github, Linkedin } from './SocialLinks';
import Link from 'next/link';

import quickLinks from '@/static/quickLinks';
import tags from '@/static/tags';
import FooterForm from './FooterForm';

const footerTitle = (name: string) => <>
  <h2 className="font-medium">{name}</h2>
  <span className="block bg-black w-14 h-1 mt-1" />
  <hr className="border-gray-300 pb-6" />
</>;

const LayoutFooter = () => {
  return (
    <footer className="w-full bg-gray-200">
      <div className="grid grid-cols-4 gap-8 mx-auto container max-w-6xl px-6 pt-12 text-sm">
        <div className="col-span-4 sm:col-span-2 lg:col-span-1">
          {footerTitle('SOBRE O BLOG')}

          <h3 className="pb-3 font-semibold">Propósito</h3>

          <p className="pb-3">
            Blog desenvolvido com o intuito de compartilhar conhecimento e reunir pessoas
            interessadas pela TI.
          </p>
          <p className="pb-4">
            Todos os visitantes são livres para compartilhar ideias e conhecimentos
            através dos comentários.
          </p>

          <h3 className="pb-3 font-semibold">Fale comigo</h3>
          <div className="flex gap-2 items-center">
            <Linkedin width={28} className="" />
            <Github width={28} className="" />
          </div>
          <a
            className="
              mt-3 inline-block underline hover:text-blue-400 transition-colors duration-300
            "
            href="mailto:contato@alltech.mystack.site"
          >
            alltech@mystack.site
          </a>
        </div>

        <div className="col-span-4 sm:col-span-2 lg:col-span-1">
          {footerTitle('LINKS RÁPIDOS')}

          <div>
            {quickLinks.map(({ name, url }, index, arr) => (
              <div key={name} className="flex flex-col gap-2 pb-2">
                <Link
                  className="hover:text-blue-400 transition-colors duration-300 text-gray-600"
                  href={url}
                >
                  {name}
                </Link>
                {index < arr.length - 1 &&
                  <hr className="border-gray-300" />
                }
              </div>
            ))}
          </div>

        </div>

        <div className="col-span-4 sm:col-span-2 lg:col-span-1">
          {footerTitle('TAGS')}

          <div className="flex flex-wrap gap-1">
            {tags.map(({ name, url }) => (
              <Link
                className="
                  py-2 px-3 rounded-full bg-gray-50 m-1 text-gray-600
                  transition-colors hover:text-blue-400 duration-300
                "
                href={url}
                key={name}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-4 sm:col-span-2 lg:col-span-1">
          {footerTitle('NEWSLETTER')}

          <p className="pb-6">
            Inscreva-se na nossa newsletter para ser informado sobre as nossas atualizações!
          </p>
          <FooterForm />
        </div>
      </div>

      <div className="py-6 mx-auto container max-w-6xl px-6 ">
        <hr className="border-gray-300 col-span-4 mt-12" />

        <div className="pt-6 text-xs flex flex-col sm:flex-row items-center justify-between text-gray-500 text-center">
          <span className="my-1">© 2023 - All Tech Blog - Todos os Direitos Reservados</span>
          <span className="my-1">
            Desenvolvido por{' '}
            <a
              className="text-blue-400 underline"
              href="https://www.linkedin.com/in/sandersonrafael/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sanderson Rafael
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
