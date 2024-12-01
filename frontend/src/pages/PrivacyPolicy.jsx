import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
          <li className="underline py-[14px] px-[20px] text-center text-black hover:text-black border border-gray-50 hover:border-red-500 hover:rounded-[25px]">
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



      <div className=" bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden">
        <h1 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">Privacy Policy</h1>
        <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">
        We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website  and use our services, including renting tools.
        </p>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
           By accessing or using our Site, you consent to the collection and use of your personal information as described in this Privacy Policy.
        </p>
        <h6 className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10"><strong>1. Information We Collect</strong></h6>
        <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">
        We may collect personal information from you in various ways when you use our Site, including when you register for an account, rent tools, contact customer support, or interact with our content. The types of personal information we collect may include: 
        </p>
             <ul className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10 pb-10">
                <li className="flex items-baseline text-lg font-medium text-gray-700">
                    <span className="w-4 h-2 mr-3 rounded-full bg-current"></span>
                    Personal Identification Information: Name, email address, phone number, mailing address, payment information, and any other information you provide when creating an account or renting tools.
                </li>
                <li className="flex items-baseline text-lg font-medium text-gray-700">
                    <span className="w-3 h-2 mr-2 rounded-full bg-current"></span>
                    Transactional Information: Details of the tools you rent, rental dates, payment history, and communication regarding your rentals.
                </li>
                <li className="flex items-baseline text-lg font-medium text-gray-700">
                    <span className="w-3 h-2 mr-2 rounded-full bg-current"></span>
                    Location Information: If you grant us permission, we may collect location data to assist with tool delivery or pickup.
                </li>
            </ul>
        <h6 className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10"><strong>2. How We Use Your Information</strong></h6>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
        We use the information we collect to process tool rental orders, manage your account, deliver tools, and for communication related to rentals as well as to comply with applicable laws, regulations, and legal obligations, including preventing fraud and resolving disputes.
        </p>
        <h6 className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10"><strong>3. Sharing Your Information</strong></h6>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
        For Legal purposes we may disclose your personal information if required by law or in response to legal processes (such as court orders).
        </p>
        <h6 className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10"><strong>4. Data Security</strong></h6>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
        We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.
        </p>
        <h6 className="text-[18px] tracking-[2px] list-none space-y-4 p-4 pl-10"><strong>5. Your Choices and Rights</strong></h6>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
        You have certain rights regarding your personal information that include making a request to access or correction of your personal data or to delete your personal information. All of it is subject to certain legal exceptions.
        </p>
        <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
        If you have any questions or concerns about this Privacy Policy, or if you would like to exercise your rights regarding your personal data, please contact us <Link to="/contact" className="text-lg text-gray-400">here</Link>.
        </p>
        
        <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-center min-h-[20vh] m-0 p-0"></div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
