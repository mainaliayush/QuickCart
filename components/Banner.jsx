import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#F1F4F9] my-16 rounded-xl overflow-hidden">
      {/* Left Image */}
      <Image
        className="max-w-56"
        src={assets.jbl_soundbox_image} // Change this to a relevant RFID product image
        alt="rfid_scanner_image"
      />

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[320px]">
          Smarter ID & Barcode Solutions
        </h2>
        <p className="max-w-[360px] font-medium text-gray-800/70">
          Elevate your operations with secure, scannable, and customizable RFID tools.
        </p>
        <button className="group flex items-center justify-center gap-1 px-10 py-2.5 bg-black rounded text-white font-medium hover:bg-blue-700 transition">
          Explore Solutions
          <Image
            className="group-hover:translate-x-1 transition"
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
          />
        </button>
      </div>

      {/* Right Image - Desktop and Mobile versions */}
      <Image
        className="hidden md:block max-w-80"
        src={assets.md_controller_image} // Replace with a professional product image
        alt="rfid_terminal_image"
      />
      <Image
        className="md:hidden max-w-56"
        src={assets.sm_controller_image} // Replace with mobile-friendly version
        alt="rfid_mobile_terminal"
      />
    </div>
  );
};

export default Banner;
