const AboutUsNav = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="mb-8">
      <ul className="flex justify-center space-x-8">
        <li
          className={`py-[14px] px-[20px] text-center hover:border-red-500 hover:rounded-[25px] border border-gray-50
              ${activeSection === 'about' ? 'bg-red-500 text-white rounded-[25px]' : 'text-black'}`}
          onClick={() => setActiveSection('about')}
        >
          About Us
        </li>
        <li
          className={`py-[14px] px-[20px] text-center hover:border-red-500 hover:rounded-[25px] border border-gray-50
              ${activeSection === 'terms' ? 'bg-red-500 text-white rounded-[25px]' : 'text-black'}`}
          onClick={() => setActiveSection('terms')}
        >
          Terms of Use
        </li>
        <li
          className={`py-[14px] px-[20px] text-center hover:border-red-500 hover:rounded-[25px] border border-gray-50
              ${activeSection === 'privacy' ? 'bg-red-500 text-white rounded-[25px]' : 'text-black'}`}
          onClick={() => setActiveSection('privacy')}
        >
          Privacy Policy
        </li>
        <li
          className={`py-[14px] px-[20px] text-center hover:border-red-500 hover:rounded-[25px] border border-gray-50
              ${activeSection === 'faq' ? 'bg-red-500 text-white rounded-[25px]' : 'text-black'}`}
          onClick={() => setActiveSection('faq')}
        >
          FAQ
        </li>
      </ul>
    </nav>
  );
};

export default AboutUsNav;
