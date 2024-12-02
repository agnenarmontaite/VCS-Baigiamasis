import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutUsNavigation from '../components/AboutUsNav';
import FAQ from '../components/FAQ';
import PrivacyPolicy from '../components/PrivacyPolicy';
import TermsOfUse from '../components/TermsOfUse';
import About from '../components/AboutUs';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('about');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [location]);

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'terms':
        return <TermsOfUse />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'faq':
        return <FAQ />;
      default:
        return <About />;
    }
  };

  return (
    <div className="container m-auto p-10 text-justify">
      <AboutUsNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden">
        <h1 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">
          {activeSection === 'about' && 'About Us'}
          {activeSection === 'terms' && 'Terms of Use'}
          {activeSection === 'privacy' && 'Privacy Policy'}
          {activeSection === 'faq' && 'FAQ'}
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default AboutUs;
