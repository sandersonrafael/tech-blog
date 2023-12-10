import IconSpinner from '@/icons/IconSpinner';

type LoadingTypes = {
  diameter?: number;
  color?: string;
};

const Loading = ({ diameter = 24, color = 'rgb(59, 130, 246)' }: LoadingTypes) => {
  return (
    <IconSpinner className="animate-spin" width={diameter} height={diameter} color={color} />
  );
};

export default Loading;
