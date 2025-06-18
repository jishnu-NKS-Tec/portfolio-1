import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const shortBioTexts = [
  "I am a passionate full-stack developer , My journey began with a love for clean design and efficient code, which has grown into a deep expertise in modern JavaScript frameworks and backend technologies.",
  "Skilled in React, Node.js, and databases like MongoDB, I specialize in transforming complex ideas into intuitive, responsive digital products. I am equally comfortable working on frontend animations with GSAP as I am architecting scalable backend systems.",
  "Beyond coding, I am fascinated by how technology intersects with creativity — from interactive storytelling to data visualization. I’m always eager to learn new tools and push the boundaries of web experiences.",
];

const sections = [
  {
    title: "Frontend Developer",
    description:
      " Specialized in building sleek interfaces using React, Tailwind CSS, and animations with GSAP.",
    image: "/person-working-html-computer.jpg",
  },
  {
    title: "Backend Developer",
    description:
      "  Experienced with Node.js,Express,and MongoDB to build secure and scalable APIs.",
    image: "/programming-background-with-person-working-with-codes-computer.jpg",
  },
  {
    title: "Creative Technologist",
    description:
      " Love blending code with creativity whether its animation, WebGL, or interactive story telling, I enjoy creating engaging user experiences.",
    image: "/design.jpg",
  },
];

const skillsByCategory = {
  "Frontend Developer": [
    "HTML5 & CSS3",
    "JavaScript (ES6+)",
    "React & Next.js",
    "Tailwind CSS",
    "GSAP & Framer Motion",
  ],
  "Backend Developer": ["Node.js & Express", "MongoDB", "REST APIs", "Git & GitHub"],
  "Creative Technologist": [
    "GSAP & Framer Motion",
    "WebGL",
    "Interactive Storytelling",
    "Data Visualization",
  ],
};

const About = () => {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);
  const containerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const currentCategory = sections[activeIndex].title;
  const currentSkills = skillsByCategory[currentCategory] || [];

  // No typing effect here, just show full description immediately
  const descriptionText = sections[activeIndex].description;

  // Auto-rotate sections every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // GSAP animation for short bio letter fade and slide in
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    shortBioTexts.forEach((line) => {
      const p = document.createElement("p");
      p.className = "mb-4 inline-block text-lg max-w-4xl mx-auto";
      line.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "short-bio-letter inline-block";
        p.appendChild(span);
      });
      containerRef.current.appendChild(p);
    });

    const letters = containerRef.current.querySelectorAll(".short-bio-letter");
    gsap.set(letters, { opacity: 0, x: -10 });

    const tl = gsap.timeline();

    let letterIndex = 0;
    shortBioTexts.forEach((line, idx) => {
      const lineLength = line.length;
      tl.to(
        letters,
        {
          opacity: 1,
          x: 0,
          ease: "power2.out",
          stagger: {
            each: 0.03,
            from: letterIndex,
            amount: lineLength * 0.03,
          },
          duration: 0.04,
        },
        "+=" + (idx === 0 ? 0 : 0.5)
      );
      letterIndex += lineLength;
      tl.to({}, { duration: 0.4 });
    });
  }, []);

  // GSAP entry animation for about section
  useEffect(() => {
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    );
  }, []);

  // GSAP animation for image and description on activeIndex change
  useEffect(() => {
    if (!imageRef.current || !descriptionRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 2, ease: "power3.out" }
    ).fromTo(
      descriptionRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 2, ease: "power3.out" },
      "<"
    );
  }, [activeIndex]);

  return (
    <>
      {/* Short Bio Section */}
      <section
        id="bio"
        className="w-full px-6 py-20 bg-[#2a2a2a] text-[#e1e1e1]"
        aria-label="Short biography"
      >
        <h2 className="text-4xl max-w-5xl mx-auto mb-10 font-extrabold text-center">
          Short Bio
        </h2>
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto text-lg leading-relaxed text-center px-4 sm:px-0 whitespace-pre-wrap font-mono select-text"
          aria-live="polite"
        >
          {/* Letters will be dynamically inserted and animated */}
        </div>
      </section>

      {/* About Me Section */}
      <section
        ref={aboutRef}
        id="about"
        className="min-h-screen w-full px-6 py-20 bg-[#1f1f1f] text-[#e1e1e1]"
        aria-label="About me details"
      >
        <h2 className="text-4xl max-w-5xl mx-auto mb-12 font-extrabold text-center">
          About Me
        </h2>

        <nav
          className="flex flex-wrap gap-3 justify-center max-w-7xl mx-auto mb-16"
          role="tablist"
        >
          {sections.map((section, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`px-5 py-2 rounded-full border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#454545] ${
                  isActive
                    ? "bg-[#454545] text-indigo-300 shadow-xl border-indigo-500 z-50"
                    : "bg-[#1f1f1f] hover:bg-[#454545] text-[#e1e1e1] border-[#454545]"
                }`}
                aria-current={isActive ? "true" : undefined}
                style={
                  isActive
                    ? {
                        transform: "translateY(-6px) scale(1.05)",
                        boxShadow:
                          "0 8px 15px rgba(66, 153, 225, 0.6), 0 4px 6px rgba(66, 153, 225, 0.4)",
                        zIndex: 50,
                      }
                    : {}
                }
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
              >
                {section.title}
              </button>
            );
          })}
        </nav>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-4 sm:px-0 items-start">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden border border-[#454545] shadow-2xl max-h-[500px]">
            <img
              ref={imageRef}
              src={sections[activeIndex].image}
              alt={`Visual representation of ${sections[activeIndex].title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Description and Skills */}
          <div className="space-y-12">
            <p
              ref={descriptionRef}
              className="text-lg leading-relaxed select-text max-w-xl font-mono"
            >
              {descriptionText}
            </p>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Skills & Tech Stack</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentSkills.map((skill, idx) => (
                  <li
                    key={idx}
                    className="bg-[#454545] p-3 rounded-xl border shadow-md hover:shadow-[#454545]/70 transition-transform transform hover:scale-105 select-text text-center"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;



