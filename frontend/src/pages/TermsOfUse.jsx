import { Link } from "react-router-dom";

const TermsOfUse = () => {
  return (
    <div className="container m-auto p-10 text-justify">
<nav>
        <ul className="flex justify-center space-x-8">
          <li className="py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
            <Link to="/about" className="text-lg text-gray-700">
              About Us
            </Link>
          </li>
          <li className="underline py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
            <Link to="/terms" className="text-lg text-gray-700">
              Terms of Use
            </Link>
          </li>
          <li className="py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
            <Link to="/privacy" className="text-lg text-gray-700">
              Privacy Policy
            </Link>
          </li>
          <li className="py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
            <Link to="/faq" className="text-lg text-gray-700">
              FAQ
            </Link>
          </li>
        </ul>
     </nav>

      <div className="bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden">
        <h1 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">Terms of use</h1>
        <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">
        Tool renting is a service provided to registered customers. This service includes giving the right for the customer to use the rental object in return for the rental fee during the time of the lease agreement. Object of this lease is the rented tool. The rental fee is calculated based on the market value of the rental object and the rental period. 
        </p>
        <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">
        In order to proceed with the rental service, it is mandatory for the customer to provide the following: 
        </p>
        <ul className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10">
                <li className="flex items-center text-lg font-medium text-gray-700">
                    <span className="w-2 h-2 mr-2 rounded-full bg-current"></span>
                    A valid personal identification document,
                </li>
                <li className="flex items-center text-lg font-medium text-gray-700">
                    <span className="w-2 h-2 mr-2 rounded-full bg-current"></span>
                    A document confirming the place of residence,
                </li>
                <li className="flex items-center text-lg font-medium text-gray-700">
                    <span className="w-2 h-2 mr-2 rounded-full bg-current"></span>
                    Payment card or other payment instrument details.
                </li>
            </ul>
        <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">
        These documents must be provided at the time of transfer of the rental object. <br/>
        The minimum rental period of the tool is one day.
        </p>
        <h4 className="text-[20px] sm:text-[32px] lg:text-[28px] p-[40px] text-center">Main responsabilities of the parties:</h4>
        <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">
        The lessor ensures that the rental object is functioning properly and is in full set at the time of transfer of the rental object but does not guarantee that it will not break down during the entire rental period. The lessee is required to immediately stop working with the rented tool in case of any equipment malfunctions and to immediately report any observed malfunctions or other changes in condition to the lessor. In the event where the malfunction occurs, the lessor undertakes responsibility to eliminate said malfunction. 
        </p>
        <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">
          By creating a tool reservation, the lessee guarantees that he has the right (is of the appropriate age, has the necessary licenses, etc.) and has the knowledge to safely operate the rented tool. In the event of the third party being entrusted to handle rented tools, the lessee assumes all responsibility and risks related to the third party. 
        </p>
        <p className="text-[18px] tracking-[2px] p-10 pt-2">
        Rights, duties and obligations of the parties during the rental service period are determined in the Lease Agreement. If these conditions are not met or there are other circumstances due to which these conditions cannot be met, the lessee must inform the lessor about these circumstances before the transfer of the leased object to the lessee. 
        </p>
        <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-center min-h-[20vh] m-0 p-0"></div>
      </div>
    </div>
  )
}

export default TermsOfUse
