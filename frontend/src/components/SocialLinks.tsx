import IconGithub from '@/icons/IconGithub';
import IconLinkedin from '@/icons/IconLinkedin';

type SocialIcon = {
  className: string;
  width: number;
};

export const Linkedin = ({ className, width }: SocialIcon) => {
  return (
    <a href="https://www.linkedin.com/in/sandersonrafael"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconLinkedin className={className} color="#0a66c2" width={width} height={width} />
    </a>
  );
};

export const Github = ({ className, width }: SocialIcon) => {
  return (
    <a href="https://github.com/sandersonrafael"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconGithub className={className} width={width} height={width} />
    </a>
  );
};
