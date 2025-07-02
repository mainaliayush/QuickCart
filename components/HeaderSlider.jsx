import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderSlider = () => {

  const router = useRouter();

  const sliderData = [
    {
      id: 1,
      title: "Custom RFID & Smart Cards — Secure Your Business",
      offer: "Fast turnaround, bulk pricing available",
      buttonText1: "Browse RFID Cards",
      buttonText2: "Request a Quote",
      imgSrc: assets.rfid_smartcard,
    },
    {
      id: 2,
      title: "Barcode Key Tags & Combo Cards for Loyalty Programs",
      offer: "Trusted by top retailers & gyms",
      buttonText1: "Explore Key Tags",
      buttonText2: "View Use Cases",
      imgSrc: assets.rfid_keytag,
    },
    {
      id: 3,
      title: "Wristbands for Events & Access Control",
      offer: "RFID + Barcode Wristbands for Reliable Entry",
      buttonText1: "Shop Wristbands",
      buttonText2: "See Custom Options",
      imgSrc: assets.rfid_wristband,
    },
  ];
  

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-white border shadow-md py-10 md:px-16 px-6 mt-8 rounded-lg min-w-full"
          >
            <div className="md:pr-10 mt-10 md:mt-0 flex-1">
              <p className="text-md text-gray-500 font-medium mb-1">{slide.offer}</p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 max-w-xl">
                {slide.title}
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <button onClick={() => router.push('/all-products')} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-800 transition">
                  {slide.buttonText1}
                </button>
                <button  onClick={() => router.push('/all-products')} className="group flex items-center gap-2 px-4 py-2 text- font-medium hover:underline">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition-transform"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center flex-1">
              <Image
                className="md:w-80 w-56 object-contain"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
  
      <div className="flex items-center justify-center gap-2 mt-6">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-colors duration-600 ${
              currentSlide === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
  
};

export default HeaderSlider;
