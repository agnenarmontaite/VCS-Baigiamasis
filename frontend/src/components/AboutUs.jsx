const AboutUs = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4">
      <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-left min-h-[100%] m-0 p-0"></div>
      </div>
      <div className="lg:w-3/4 p-6 lg:pr-16 pb-20">
        <p className="text-[14px] md:text-[16px] tracking-[2px] pb-4">
          We are the leaders in the tool rental industry with the experience that is needed to provide the best services. Our team is eager to help you have the best experience picking out the tools needed for your projects.
        </p>
        <p className="text-[14px] md:text-[16px] tracking-[2px]">
          With the tools' prices increasing daily and new projects piling up we are here to offer you an alternative to over stuffed garages and sheds. Pick out your tools and hit reserve. It is that easy to have all the equipment you need to build
          your dream project!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
