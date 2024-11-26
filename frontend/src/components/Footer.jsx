import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="footer-logo-block">
                    <Link to="/" className="logo">Equipment Rental</Link>
                    <div className="footer-social-block">
                        <FaInstagram />
                        <FaFacebook />
                        <IoLogoTiktok />
                        <FaYoutube />
                        <FaLinkedin />
                    </div>
                </div>
                <div className="nav-links">
                    <div className="footer-navigation-block">
                        <p>Navigation</p>
                        <Link to="#about-us">About Us</Link>
                        <Link to="#">Terms of Use</Link>
                        <Link to="#">Privacy Policy</Link>
                    </div>
                    <div className="footer-help-block">
                        <p>Help</p>
                        <Link to="#">FAQ</Link>
                        <Link to="#contact">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;