import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-8xl z-50 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-full px-8 py-3 shadow-lg flex justify-between items-center transition-all duration-700"
    >
      <h1 className="text-xl font-bold">MyPortfolio</h1>
      <div className="space-x-6 text-sm font-medium">
        <a href="#about" className="hover:text-[#b9b8b8] transition">About</a>
        <a href="#projects" className="hover:text-[#b9b8b8] transition">Projects</a>
        <a href="#contact" className="hover:text-[#b9b8b8] transition">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
