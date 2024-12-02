const TermsOfUse = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-3/4 p-6 pl-16 pb-20">
        <p className="text-[18px] tracking-[2px] pb-4">
          Tool renting is a service provided to registered customers. This service includes giving the right for the customer to use the rental object in return for the rental fee during the time of the lease agreement. Object of this lease is the
          rented tool. The rental fee is calculated based on the market value of the rental object and the rental period.
        </p>
        <p className="text-[18px] tracking-[2px] pb-4">In order to proceed with the rental service, it is mandatory for the customer to provide the following:</p>
        <ul className="text-[18px] tracking-[2px] list-none space-y-4 pl-4">
          <li className="flex items-center text-lg font-medium text-gray-700">
            <span className="w-2 h-2 mr-2 rounded-full bg-current"></span>A valid personal identification document,
          </li>
          <li className="flex items-center text-lg font-medium text-gray-700">
            <span className="w-2 h-2 mr-2 rounded-full bg-current"></span>A document confirming the place of residence,
          </li>
          <li className="flex items-center text-lg font-medium text-gray-700">
            <span className="w-2 h-2 mr-2 rounded-full bg-current"></span>
            Payment card or other payment instrument details.
          </li>
        </ul>
      </div>
      <div className="lg:w-1/4">
        <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-left min-h-[100%] m-0 p-0"></div>
      </div>
    </div>
  );
};

export default TermsOfUse;
