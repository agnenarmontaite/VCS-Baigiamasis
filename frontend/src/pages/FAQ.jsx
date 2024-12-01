import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="container m-auto p-10 text-justify">
      <nav>
        <ul className="flex justify-center space-x-8">
          <li className="py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
            <Link to="/about" className="text-lg text-gray-700">
              About Us
            </Link>
          </li>
          <li className="py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
            <Link to="/terms" className="text-lg text-gray-700">
              Terms of Use
            </Link>
          </li>
          <li className="py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
            <Link to="/privacy" className="text-lg text-gray-700">
              Privacy Policy
            </Link>
          </li>
          <li className="underline py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
            <Link to="/faq" className="text-lg text-gray-700">
              FAQ
            </Link>
          </li>
        </ul>
     </nav>



      <div className="bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden">
        <h1 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">FAQ</h1>
        <h6 className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10"><strong>1. How does the tool rental process work?</strong></h6>
        <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">
        To rent a tool, simply browse our online catalog, select the tools you need, choose your rental duration, and proceed to checkout. You will be asked to create an account or log in if you already have one. After confirming your order, we will deliver the tools to your location or arrange for pickup, depending on your preferences.
        </p>
        <h6 className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10"><strong>2. What types of tools can I rent from your website?</strong></h6>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
        We offer a wide range of tools for various needs, including genrators, rotary hammers, electric routers, and more. You can browse our catalog by category or search for a specific tool on our website.
        </p>
        <h6 className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10"><strong>3. How long can I rent a tool for?</strong></h6>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
        Rental durations vary based on the tool and your needs. You can rent most tools for a period ranging from 1 day to several weeks. When selecting a tool, you'll be able to choose your preferred rental duration, and the price will update accordingly.
        </p>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
        <strong>Your question has not been answered?</strong> Please contact us <Link to="/contact" className="text-lg text-gray-400">here</Link> and let us know your concerns.
        </p>

        <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-center min-h-[20vh] m-0 p-0"></div>
      </div>
    </div>
  );
};

export default FAQ;
