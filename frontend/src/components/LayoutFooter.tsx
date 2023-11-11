import { Github, Linkedin } from './SocialLinks';

const LayoutFooter = () => {
  return (
    <footer className="w-full bg-gray-200">
      <div className="grid grid-cols-4 gap-6 mx-auto container max-w-6xl px-6 py-12 text-sm">
        <div>
          <h2 className="font-medium">SOBRE O BLOG</h2>
          <span className="block bg-black w-14 h-1 mt-1" />
          <hr className="border-gray-300 pb-6" />

          <h3 className="pb-3 font-semibold">Propósito</h3>

          <p className="pb-3">Blog desenvolvido com o intuito de compartilhar conhecimento e reunir pessoas interessadas pela TI.</p>
          <p className="pb-4">Todos os visitantes são livres para compartilhar ideias e conhecimentos através dos comentários.</p>

          <h3 className="pb-3 font-semibold">Me Siga</h3>
          <div className="flex gap-2 items-center">
            <Linkedin width={28} className="" />
            <Github width={28} className="" />
          </div>
        </div>

        <div>

        </div>

        <div>

        </div>

        <div>

        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
