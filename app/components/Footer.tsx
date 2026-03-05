import Link from 'next/link';
import { FiPhone, FiMapPin, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-black to-gray-800 text-white pt-12 md:pt-16 pb-6">      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">About Us</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              At Aquashoppe.in, we bring nature to your aquarium with a curated selection of healthy aquatic plants. Our goal is to make aquascaping accessible and enjoyable with quality products, expert support, and doorstep delivery across India.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiPhone className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">CALL US 24/7</p>
                  <a href="tel:7736041322" className="text-white hover:text-gold transition">
                    7736041322
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FiMapPin className="text-gold mt-1 shrink-0" />
                <p className="text-sm text-gray-300">
                  Mj Guppy Fish Farm, K.S Puram, Karunagapally, Kollam PIN: 690544
                </p>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Useful Links</h3>
            <ul className="space-y-2">
              {[
                'About Us',
                'Terms and Conditions',
                'Shipping Policy',
                'Privacy Policy',
                'Shipping & Return Policy',
                'Cancellation Policy'
              ].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-gray-300 hover:text-gold text-sm transition"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Sign up and get cutting-edge marketing insights delivered to your inbox
            </p>
            
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-gold text-sm"
              />
              <button 
                type="submit"
                className="bg-gold text-navy px-4 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition text-sm"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition"
              >
                <FaFacebook size={22} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition"
              >
                <FaTwitter size={22} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition"
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              Copyright © 2026 aquashoppe. All Rights Reserved. Maintained by Anshu
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">We Accept:</span>
              <span className="text-sm text-gray-300">💰 UPI | Card | COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;