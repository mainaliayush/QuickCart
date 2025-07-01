import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.scan_id,
    title: "RFID Badge Systems",
    description: "Secure, scannable ID badges for access control and event check-in.",
  },
  {
    id: 2,
    image: assets.key_tag,
    title: "Custom Key Tags",
    description: "Durable barcode key tags ideal for memberships and loyalty programs.",
  },
  {
    id: 3,
    image: assets.inventory_track,
    title: "Inventory Tracking Tools",
    description: "Optimize operations with barcode and RFID-based tracking solutions.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium"> Secure ID & Tracking Systems </p>
        <div className="w-28 h-0.5 bg-blue-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group rounded-md overflow-hidden">
            {/* Image container */}
            <div className="w-full h-80 relative">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition duration-300 group-hover:brightness-75"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition duration-300" />
            </div>

            {/* Text content */}
            <div className="absolute bottom-8 left-8 text-white space-y-2 z-10">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">{description}</p>
              {/* <button className="flex items-center gap-1.5 bg-blue-600 px-4 py-2 rounded">
                See More <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
