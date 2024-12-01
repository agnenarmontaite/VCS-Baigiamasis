import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import toolRentalLogo from '../assets/rent-a-tool-logo.png';

const Footer = () => {
    return (
        <footer>
            <div className="footer flex flex-col justify-around items-center text-center md:flex-row md:justify-between p-[40px] min-h-[280px] bg-gray-200 gap-10">
                <div className="footer-logo-block flex flex-col">
                    <Link to="/" className="logo text-[24px] font-bold">
                        <img src={toolRentalLogo} alt="tool-rental-logo" className="h-[150px]"></img>
                    </Link>
                    <div className="footer-social-block flex text-red-500 gap-[10px] text-[20px] mt-[20px]">
                        <Link to="#"><FaInstagram /></Link>
                        <Link to="#"><FaFacebook /></Link>
                        <Link to="#"><IoLogoTiktok /></Link>
                        <Link to="#"><FaYoutube /></Link>
                        <Link to="#"><FaLinkedin /></Link>
                    </div>
                </div>
                <div className="nav-links flex justify-center gap-14 md:gap-[150px] lg:gap-[240px] md:mr-[120px]">
                    <div className="footer-navigation-block flex flex-col gap-[21px]">
                        <p className="text-red-500 font-bold">Navigation</p>
                        <Link to="/about">About Us</Link>
                        <Link to="/terms">Terms of Use</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                    <div className="footer-help-block flex flex-col gap-[21px]">
                        <p className="text-red-500 font-bold">Help</p>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
