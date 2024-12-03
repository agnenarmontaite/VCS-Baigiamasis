const FAQ = () => {
    return (
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4">
          <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-left min-h-[100%] m-0 p-0"></div>
        </div>
        <div className="lg:w-3/4 p-6">
          <h6 className="text-[16px] md:text-[18px] tracking-[2px] list-none space-y-4 pb-4 lg:p-4 lg:pl-10"><strong>1. How does the tool rental process work?</strong></h6>
          <p className="text-[14px] md:text-[16px] tracking-[2px] lg:p-10 py-2 lg:py-2">
            To rent a tool, simply browse our online catalog, select the tools you need, choose your rental duration, and proceed to checkout. You will be asked to create an account or log in if you already have one. After confirming your order, we will deliver the tools to your location or arrange for pickup, depending on your preferences.
          </p>
  
          <h6 className="text-[16px] md:text-[18px] tracking-[2px] list-none space-y-4 py-4 lg:p-4 lg:pl-10"><strong>2. What types of tools can I rent from your website?</strong></h6>
          <p className="text-[14px] md:text-[16px] tracking-[2px] lg:p-10 py-2 lg:py-2">
            We offer a wide range of tools for various needs, including genrators, rotary hammers, electric routers, and more. You can browse our catalog by category or search for a specific tool on our website.
          </p>
  
          <h6 className="text-[16px] md:text-[18px] tracking-[2px] list-none space-y-4 py-4 lg:p-4 lg:pl-10"><strong>3. How long can I rent a tool for?</strong></h6>
          <p className="text-[14px] md:text-[16px] tracking-[2px] lg:p-10 py-2 lg:py-2">
            Rental durations vary based on the tool and your needs. You can rent most tools for a period ranging from 1 day to several weeks. When selecting a tool, you'll be able to choose your preferred rental duration, and the price will update accordingly.
          </p>
        </div>
      </div>
    );
  };
  
  export default FAQ;