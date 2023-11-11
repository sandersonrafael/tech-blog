import MainTopics from './MainTopics';
import SideTopics from './SideTopics';

const HomeContent = () => {
  return (
    <div className="mt-14 bg-gray-100 w-full pb-14">
      <div className="
        grid lg:grid-cols-3 grid-cols-1 pt-12 gap-6
        max-w-lg sm:container mx-auto xl:max-w-6xl md:px-6 px-3
      ">
        <MainTopics className="col-span-1 lg:col-span-2" />

        <SideTopics className="col-span-1" />
      </div>
    </div>
  );
};

export default HomeContent;
