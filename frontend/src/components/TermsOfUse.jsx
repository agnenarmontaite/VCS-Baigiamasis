const TermsOfUse = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-3/4 p-6 lg:pl-16 pb-20">
        <p className="text-[14px] md:text-[16px] tracking-[2px] pb-4">
          Tool renting is a service provided to registered customers. This service includes giving the right for the customer to use the rental object in return for the rental fee during the time of the lease agreement. Object of this lease is the
          rented tool. The rental fee is calculated based on the market value of the rental object and the rental period.
        </p>
        
        <p className="font-bold text-[14px] md:text-[16px] tracking-[2px] pb-4">In order to proceed with the rental service, it is mandatory for the customer to provide the following:</p>
        <ul className="tracking-[2px] list-disc space-y-4 pl-4 pb-4">
          <li className="text-[12px] md:text-[16px] font-medium text-gray-700">
            A valid personal identification document,
          </li>
          <li className="text-[12px] md:text-[16px] font-medium text-gray-700">
            A document confirming the place of residence,
          </li>
          <li className="text-[12px] md:text-[16px] font-medium text-gray-700">
            Payment card or other payment instrument details.
          </li>
        </ul>
        <p className="font-bold text-[14px] md:text-[16px] tracking-[2px] pb-4"><strong>Please note that you must to be over the age of 18 to rent out tools on this site. </strong></p>
      </div>
      <div className="lg:w-1/4">
        <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-left min-h-[100%] m-0 p-0"></div>
      </div>
    </div>
  );
};

export default TermsOfUse;
