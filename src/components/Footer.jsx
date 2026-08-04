import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";


function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section - Contact */}
        <div className="text-center mb-10" id="Contacts">
          <p className="text-gray-400 uppercase tracking-wide">LET&apos;S WORK TOGETHER</p>
          <h2 className="text-4xl font-bold text-brand-400 mt-2">
            +233 (0) 244718186
          </h2>
          <p className="mt-2 text-gray-300">Plot M51, Tema, C25, Ghana.</p>
          <p className="text-gray-300">murraygh@yahoo.com</p>
        </div>

        {/* Bottom Section - Footer Links.
            Mobile: Company + Services side by side, Contact centered
            underneath (inverted-triangle composition). md+: original four
            columns, unchanged. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-gray-700 pt-8 md:grid-cols-4 md:gap-8">
          {/* Brand Info — dedicated dark-background logo variant (white text,
              official red preserved) sits directly on the navy footer */}
          <div className="col-span-2 md:col-span-1">
            <img className="h-14 w-auto mb-4" src={assets.logoDark} alt="Murray Investments Co. Ltd. logo" loading="lazy" decoding="async" />
            <p className="text-gray-300">
            A Ghanaian real estate company developing, marketing and managing quality properties across Ghana and the West African sub-region.
            </p>
          </div>

          {/* Company Links */}
          <div className="min-w-0">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li className="hover:text-brand-400"><Link className="inline-block py-1" to="/#About">About Us</Link></li>
              <li className="hover:text-brand-400"><Link className="inline-block py-1" to="/#Services">Services</Link></li>
              <li className="hover:text-brand-400"><Link className="inline-block py-1" to="/#Projects">Projects</Link></li>
              <li className="hover:text-brand-400"><a className="inline-block py-1" href="#Contacts">Contacts</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="min-w-0">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li className="hover:text-brand-400"><Link className="inline-block py-1" to="/#PropRen">Property Renovation</Link></li>
              <li className="hover:text-brand-400"><Link className="inline-block py-1" to="/#PropDev">Property Development</Link></li>
              <li className="hover:text-brand-400"><Link className="inline-block py-1" to="/#PropMan">Property Management</Link></li>
              <li className="hover:text-brand-400"><Link className="inline-block py-1" to="/#LandSale">Land Sale</Link></li>
            </ul>
          </div>

          {/* Contact — centered beneath both columns on mobile, left-aligned
              in its own column on md+ */}
            <div className="col-span-2 text-center md:col-span-1 md:text-left">
             <h4 className="text-lg font-semibold">Contact Us</h4>
             <div className="mt-3 flex justify-center gap-2 text-xl md:justify-start">
                <a href="mailto:murraygh@yahoo.com" aria-label="Email Murray Investments Co. Ltd." className="p-3 text-gray-300 hover:text-brand-400 transition"><FaEnvelope aria-hidden="true" /></a>
              <a href="https://wa.me/233244718186" aria-label="Chat with us on WhatsApp" className="p-3 text-gray-300 hover:text-[#25D366] transition"><FaWhatsapp aria-hidden="true" /></a>
              <a href="tel:+233244718186" aria-label="Call Murray Investments Co. Ltd." className="p-3 text-gray-300 hover:text-brand-400 transition"><FaPhone aria-hidden="true" /></a>
             </div>
            </div>
        </div>

        {/* Copyright Section — centered and stacked on mobile, with bottom
            room so the floating WhatsApp / back-to-top buttons never sit on
            top of the text; original two-up row returns at sm+. */}
        <div className="mt-8 flex flex-col items-center gap-1 border-t border-gray-700 pb-20 pt-4 text-center text-sm text-gray-400 sm:flex-row sm:justify-between sm:gap-0 sm:pb-4 sm:pr-20 sm:text-left">
          <p>© {new Date().getFullYear()} Murray Investments Co. Ltd.</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 