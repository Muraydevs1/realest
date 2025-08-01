import React from "react";
import { FaFacebookF, FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import { assets } from "../assets/assets";


function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white py-12">
      <div className="container mx-auto px-6 md:px-20">
        {/* Top Section - Contact */}
        <div className="text-center mb-10" id="Contacts">
          <p className="text-gray-400 uppercase tracking-wide">LET'S WORK TOGETHER</p>
          <h2 className="text-4xl font-bold text-orange-500 mt-2">
            +233 (0) 244718186
          </h2>
          <p className="mt-2 text-gray-300">Plot M51, Tema, C25, Ghana.</p>
          <p className="text-gray-300">murraygh@yahoo.com</p>
        </div>

        {/* Bottom Section - Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-gray-700 pt-8">
          {/* Brand Info */}
          <div className="-mt-10">
            <img className="h-16 w-28 m-3" src={assets.logo1} alt="" />
            <p className="text-gray-300 -mt-5">
            We provide the best industrial and technological services throughout Ghana.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li className="hover:text-orange-400 cursor-pointer"><a href="#About">About Us</a></li>
              <li className="hover:text-orange-400 cursor-pointer"><a href="#Services">Services</a></li>
              <li className="hover:text-orange-400 cursor-pointer"><a href="#Projects">Projects</a></li>
              <li className="hover:text-orange-400 cursor-pointer"><a href="#Contacts">Contacts</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li className="hover:text-orange-400 cursor-pointer"><a href="PropRen">Property Renovation</a></li>
              <li className="hover:text-orange-400 cursor-pointer"><a href="Propdev">Property Development</a></li>
              <li className="hover:text-orange-400 cursor-pointer"><a href="PropMan">Property Management</a></li>
              <li className="hover:text-orange-400 cursor-pointer"><a href="LandSale">Land Sale</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
            
            <div>
             <p className="text-lg font-semibold"> Contact Us.</p>
             <div  className="flex space-x-4 mt-4"> 
                <a href="mailto:murraygh@yahoo.com" className="text-blue-600 hover:text-blue-800 flex items-center gap-2"><FaEnvelope /></a>
              <FaFacebookF className="text-xl hover:text-orange-400 cursor-pointer" />
              <FaWhatsapp className="text-xl hover:text-orange-400 cursor-pointer" />
              <a href="tel:+233244718186" className="text-green-600 hover:text-green-800 flex items-center gap-2"><FaPhone /></a>
             </div>
            </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex justify-between text-gray-400 text-sm">
          <p>© muray_dev</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 