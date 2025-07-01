import React from "react";
import Image from "next/image";
import companyLogo from "@/assets/company_logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] text-gray-600 border-t border-gray-300 mt-20">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 px-6 md:px-16 lg:px-32 py-14 border-b border-gray-300">
        {/* Logo + About */}
        <div className="w-full md:w-1/3">
          <Image className="w-28 md:w-40" src={companyLogo} alt="Vanguard ID Systems Logo" />
          <p className="mt-6 text-sm leading-relaxed text-gray-500 max-w-xs">
            Vanguard ID Systems is a leader in RFID, barcode, and secure card solutions. Trusted by businesses and institutions for reliable identification and tracking products.
          </p>
        </div>

        {/* Navigation */}
        <div className="w-full md:w-1/4">
          <h2 className="font-medium text-gray-900 mb-4">Company</h2>
          <ul className="text-sm space-y-2">
            <li><a className="hover:text-blue-600 transition" href="#">Home</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">About Us</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Contact</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Careers</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/4">
          <h2 className="font-medium text-gray-900 mb-4">Get in Touch</h2>
          <div className="text-sm space-y-2 text-gray-500">
            <p>+1 (610) 738-1340</p>
            <p>info@vanguardid.com</p>
            <p>275 Gibraltar Rd, Horsham, PA 19044</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-xs text-gray-400 py-4 px-6">
        © {new Date().getFullYear()} Vanguard ID Systems. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
