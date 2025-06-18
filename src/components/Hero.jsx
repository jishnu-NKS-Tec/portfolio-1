import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate text fade-in
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );

    // Clip-path animation on background image
    gsap.fromTo(
      bgImageRef.current,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#cecece] text-white overflow-hidden"
    >
      {/* Background Image with Clip-path */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('1000118279[1].jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Optional: Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 text-center" ref={textRef}>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Hi, I'm <span className="text-indigo-400">Jishnu Narayanan</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-6">
          A passionate Full Stack Developer crafting engaging web experiences
          using React, Node.js, and modern tools.
        </p>
        <a
          href="#projects"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition duration-300"
        >
          View My Work
        </a>
      </div>
    </section>
  );
};

export default Hero;

