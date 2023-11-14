import stack from '@/imgs/blog-stack.png';
import Image from 'next/image';

const HomeBanner = () => {
  return (
    <section className="py-10 md:pt-20 md:pb-16 bg-gray-100 w-full">
      <div className="block md:flex justify-between container mx-auto xl:max-w-6xl md:px-6 px-3">
        <div className="flex-1">
          <div className="h-full flex flex-col justify-center">
            <p className="pb-4 text-sm font-normal text-gray-500">Full Stack Developer</p>
            <h2 className="text-5xl font-extrabold pb-5">
            Olá, me chamo Rafael
              <br />Bem vindo ao meu Blog!
            </h2>
            <p className="pb-8 font-medium text-lg text-gray-500">
              Aqui você acompanha as novidades, curiosidades e
              guias do mundo do desenvolvimento de software
            </p>
          </div>
        </div>

        <div className="flex-1">
          <Image
            src={stack}
            alt="Minha Stack de Desenvolvimento"
            className="max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-sm mx-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
