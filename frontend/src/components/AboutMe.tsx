import Image from 'next/image';
import { Github, Linkedin } from './SocialLinks';

const AboutMe = () => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-7">
      <Image
        src="/profile.jpg"
        alt="Sanderson Rafael"
        width={400}
        height={400}
        className="rounded-full w-16 mb-4"
      />
      <h3 className="font-semibold text-xl mb-4 text-gray-800">Olá, me chamo Sanderson Rafael</h3>
      <p className="text-sm mb-4 text-gray-600">
        Apaixonado pelo desenvolvimento de sotfware desde 2022, desenvolvo principalmente com
        Next + TypeScript no Front-end e Java + Spring Boot no Back-end.
      </p>
      <div className="flex content-center gap-2">
        <span>Me siga: </span>
        <Linkedin className="" width={24} />
        <Github className="" width={23} />
      </div>
    </div>
  );
};

export default AboutMe;
