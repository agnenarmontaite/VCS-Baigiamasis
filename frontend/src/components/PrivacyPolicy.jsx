const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-3/4 p-6 pl-16 pb-20">
        <p className="text-[18px] tracking-[2px] pb-4">
          We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website and use our services, including renting tools.
        </p>

        <p className="text-[18px] tracking-[2px] pb-4">Information We Collect:</p>

        <ul className="text-[18px] tracking-[2px] list-none space-y-4 pl-4">
          <li className="flex items-center text-lg font-medium text-gray-700">
            <span className="w-2 h-2 mr-2 rounded-full bg-current mt-[-25px]"></span>
            Personal Identification Information: Name, email address, phone number, mailing address, payment information.
          </li>
          <li className="flex items-center text-lg font-medium text-gray-700">
            <span className="w-2 h-2 mr-2 rounded-full bg-current"></span>
            Transactional Information: Details of the tools you rent, rental dates, payment history.
          </li>
          <li className="flex items-center text-lg font-medium text-gray-700">
            <span className="w-2 h-2 mr-2 rounded-full bg-current"></span>
            Location Information: If you grant us permission, we may collect location data.
          </li>
        </ul>
      </div>
      <div className="lg:w-1/4">
        <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-left min-h-[100%] m-0 p-0"></div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
