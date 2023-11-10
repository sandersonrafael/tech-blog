import AboutMe from '../AboutMe';

const SideTopics = ({ className }: { className?: string }) => {
  return (
    <aside className={className}>
      <AboutMe />
    </aside>
  );
};

export default SideTopics;
