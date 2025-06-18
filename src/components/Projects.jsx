import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const projectsData = [
  {
    title: "Project One",
    description: "This is the first project description.",
    tech: ["React", "Node.js", "MongoDB"],
    videoSrc: "/20250603-1206-29.7670675.mp4",
    github: "https://github.com/yourusername/project1",
  },
  {
    title: "Project Two",
    description: "This is the second project description.",
    tech: ["Next.js", "Tailwind CSS", "Firebase"],
    videoSrc: "/20250603-1206-29.7670675.mp4",
    github: "https://github.com/yourusername/project2",
  },
  {
    title: "Project Three",
    description: "This is the third project description.",
    tech: ["React Native", "Expo", "GraphQL"],
    videoSrc: "/20250603-1206-29.7670675.mp4",
    github: "https://github.com/yourusername/project3",
  },
  {
    title: "Project Four",
    description: "This is the fourth project description.",
    tech: ["Vue", "Pinia", "Supabase"],
    videoSrc: "/20250603-1206-29.7670675.mp4",
    github: "https://github.com/yourusername/project4",
  },
  {
    title: "Project Five",
    description: "This is the fifth project description.",
    tech: ["Svelte", "Node.js", "Prisma"],
    videoSrc: "/20250603-1206-29.7670675.mp4",
    github: "https://github.com/yourusername/project5",
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);
  const scrubbingRef = useRef(false);

  // Play active video, pause others and reset time
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
        setIsPlaying(true);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  // Handle video ended event to move to next project
  useEffect(() => {
    const currentVideo = videoRefs.current[activeIndex];
    if (!currentVideo) return;

    const handleEnded = () => {
      setActiveIndex((prev) => (prev + 1) % projectsData.length);
    };

    currentVideo.addEventListener("ended", handleEnded);
    return () => currentVideo.removeEventListener("ended", handleEnded);
  }, [activeIndex]);

  // Update progress bar as video plays
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (!video) return;

    const updateProgress = () => {
      if (!video.duration) {
        setProgress(0);
        return;
      }
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [activeIndex]);

  // Global mouseup/touchend handler to stop scrubbing when released anywhere
  useEffect(() => {
    const stopScrubbing = () => {
      scrubbingRef.current = false;
    };
    window.addEventListener("mouseup", stopScrubbing);
    window.addEventListener("touchend", stopScrubbing);
    return () => {
      window.removeEventListener("mouseup", stopScrubbing);
      window.removeEventListener("touchend", stopScrubbing);
    };
  }, []);

  // Select project by index
  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  // Seek video according to click or drag position on progress bar
  const handleSeek = (e) => {
    const video = videoRefs.current[activeIndex];
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clickX = clientX - rect.left;
    let percentage = clickX / rect.width;

    percentage = Math.min(Math.max(percentage, 0), 1);

    const seekTime = percentage * video.duration;
    video.currentTime = seekTime;
    video.play().catch(() => {});
    setIsPlaying(true);
    setProgress(percentage * 100);
  };

  const handleMouseDown = (e) => {
    scrubbingRef.current = true;
    handleSeek(e);
  };

  const handleMouseMove = (e) => {
    if (!scrubbingRef.current) return;
    handleSeek(e);
  };

  const handleTouchStart = (e) => {
    scrubbingRef.current = true;
    handleSeek(e);
  };

  const handleTouchMove = (e) => {
    if (!scrubbingRef.current) return;
    handleSeek(e);
  };

  // Toggle play/pause video
  const togglePlayPause = () => {
    const video = videoRefs.current[activeIndex];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const currentProject = projectsData[activeIndex];

  return (
    <section
      id="projects"
      className="min-h-screen w-full px-6 py-16 bg-[#0f0f0f] text-white"
    >
      <h2 className="text-4xl font-bold text-center mb-16">My Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text + Progress Bar */}
        <div className="flex flex-col justify-between h-[500px] bg-[#1c1c1c] p-6 rounded-xl shadow-lg">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-3">
              {currentProject.title}
            </h3>
            <p className="text-gray-300 mb-4">{currentProject.description}</p>
            <p className="text-sm text-gray-400 mb-6">
              <strong className="text-white">Tech Stack:</strong>{" "}
              {currentProject.tech.join(", ")}
            </p>
            <a
              href={currentProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              View GitHub
            </a>
          </div>

          {/* Progress Bar Navigation Buttons */}
          <div className="flex flex-col items-center mt-6 space-y-2">
            <div className="flex space-x-3">
              {projectsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  aria-label={`Select project ${idx + 1}`}
                  className={`h-2 rounded-full w-14 cursor-pointer ${
                    idx === activeIndex ? "bg-blue-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Video Carousel */}
        <div className="relative flex items-center justify-center h-[520px] overflow-hidden">
          {projectsData.map((project, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;
            const scale = isActive ? 1 : 0.85;
            const opacity = isActive ? 1 : 0.3;
            const zIndex = 10 - Math.abs(offset);

            return (
              <motion.div
                key={index}
                animate={{
                  scale,
                  x: offset * 360,
                  opacity,
                  zIndex,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`absolute w-[700px] rounded-xl overflow-hidden shadow-2xl cursor-pointer transition-all ${
                  isActive
                    ? "ring-4 ring-blue-500"
                    : "filter grayscale blur-[1px]"
                }`}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => isActive && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={project.videoSrc}
                  muted
                  loop={false}
                  playsInline
                  className="w-full h-82 object-cover"
                />

                {/* Play/Pause button - only visible on hover and only on active video */}
                {isActive && isHovered && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    className="absolute bottom-4 right-4 bg-black bg-opacity-60 rounded-full p-3 flex items-center justify-center text-white hover:bg-opacity-80 transition"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      // Pause icon (two vertical bars)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <rect x="6" y="5" width="4" height="14" />
                        <rect x="14" y="5" width="4" height="14" />
                      </svg>
                    ) : (
                      // Play icon (triangle)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Progress bar under the video */}
                {isActive && (
                  <div
                    className="relative w-full h-2 bg-gray-600 rounded cursor-pointer"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                  >
                    <div
                      className="absolute top-0 left-0 h-2 bg-slate-400 rounded transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
