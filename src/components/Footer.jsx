import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import bgImg1 from '../assets/13.jpg';
import bgImg2 from '../assets/24.jpg';
import bgImg3 from '../assets/logo1.png'

const Footer = () => {
  return (
    <div className="w-full font-serif">
      {/* Main Footer Section */}
      <section
        className="w-full py-16 px-4 min-h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-12">
          {/* Left Side */}
          <div className="flex-1 text-center md:text-left text-[#38220f]">
            <img src={bgImg3} alt="Coffee Logo" className="h-20 w-auto" />
            <h1 className="text-3xl  my-2 font-[cursive] font-bold mb-4">Espresso Emporium</h1>
            <p className="mb-6 leading-relaxed text-base">
              Always ready to be your friend. Come & Contact with us to share your memorable moments,
              to share with your best companion.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mb-8 text-2xl">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedin />
            </div>

            {/* Contact Info */}
            <h2 className="text-2xl font-semibold mb-4  my-2 font-[cursive]">Get in Touch</h2>
            <ul className="space-y-2 text-base">
              <li className="flex items-center gap-2">
                <FaPhone /> +88 01533 333 333
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope /> info@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt /> 72. Wall street, King Road, Dhaka
              </li>
            </ul>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-6 text-[#38220f] text-center md:text-left  my-2 font-[cursive]">
              Connect with Us
            </h3>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none"
              />
              <textarea
                rows="4"
                placeholder="Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className=" border rounded-xl border-[#4a2d1a]  text-[#4a2d1a] px-6 py-3  transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom Copyright */}
      <div
        className="w-full py-4 text-center text-white text-sm"
        style={{
          backgroundImage: `url(${bgImg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p>Copyright © Espresso Emporium | All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
