"use client";

import { FiFacebook, FiTwitter, FiYoutube, FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import { footerData } from "./data";

const socialMedia = [FiFacebook, FaInstagram, FiTwitter, FiYoutube, FiLinkedin];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="bg-[#141414] text-gray-400 pt-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6 pb-10">
        {footerData.map((section) => (
          <div key={section.title}>
            <h1 className="uppercase text-white text-base font-semibold mb-3">
              {section.title}
            </h1>
            <div className="space-y-1">
              {section.links.map((link) => (
                <h3 key={link} className="hover:text-white cursor-pointer">
                  {link}
                </h3>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#444444] py-6 px-6">
        <div className="max-w-7xl flex flex-wrap justify-between items-center mx-auto gap-y-6 text-sm">
          <Image src="/assets/logo.png" width={132} height={89} alt="Hello" />
          <div>
            <h3>Monday - Friday</h3>
            <h3>8:00 - 6:00 PM ET</h3>
          </div>
          <div>
            <h3>Toll Free: 866-766-4629</h3>
            <h3>Local: 216-503-6374</h3>
            <h3>sales@avadirect.com</h3>
          </div>
          <div>
            <h3>2045 Midway Dr,</h3>
            <h3>Twinsburg OH 44087</h3>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-white mb-2">
              Follow Us
            </h3>
            <div className="flex gap-4 text-2xl">
              {socialMedia.map((Icon, i) => (
                <a href="#" key={i} className="hover:text-white">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl py-4 text-xs text-center px-4 text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start text-[13px]">
          <span>
            © 2000 - 2022 AVADirect Custom Computers. All Rights Reserved.
          </span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Sale
            </span>
          </div>
        </div>
        <div className="text-[13px]">
          Proudly Built and Supported in the U.S.A.
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed right-5 bottom-6 bg-[#3f3f3f] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50"
      >
        <IoIosArrowUp size={24} />
      </button>
    </footer>
  );
}
