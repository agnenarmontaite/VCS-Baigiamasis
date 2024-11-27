import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";

const Footer = () => {
    return (
        <footer>
            <div className="footer flex justify-between">
                <div className="footer-logo-block flex flex-col">
                    <Link to="/" className="logo">Equipment Rental</Link>
                    <div className="footer-social-block flex text-red-500">
                        <FaInstagram />
                        <FaFacebook />
                        <IoLogoTiktok />
                        <FaYoutube />
                        <FaLinkedin />
                    </div>
                </div>
                <div className="nav-links flex">
                    <div className="footer-navigation-block flex flex-col">
                        <p className="text-red-500 font-bold">Navigation</p>
                        <Link to="#about-us">About Us</Link>
                        <Link to="#">Terms of Use</Link>
                        <Link to="#">Privacy Policy</Link>
                    </div>
                    <div className="footer-help-block flex flex-col">
                        <p className="text-red-500 font-bold">Help</p>
                        <Link to="#">FAQ</Link>
                        <Link to="#contact">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;