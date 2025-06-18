import React, { useState } from "react";

const Contact = () => {
  // State to track the position of the mouse relative to the right side container
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Handler to track mouse position inside the right container
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate relative position between -1 and 1 on both axes, centered
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPos({ x, y });
  };

  return (
    <section
      className="min-h-screen p-8 flex bg-gray-900 flex-col md:flex-row gap-12"
      id="contact"
    >
      {/* Left side: Contact form */}
      <div className="md:w-1/2">
        <h2 className="text-3xl text-white  font-bold mb-4">JISHNU</h2>
        <form className="max-w-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border rounded"
            rows={5}
          ></textarea>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            Send
          </button>
        </form>
      </div>

      {/* Right side: Animated container */}
    <div
  onMouseMove={handleMouseMove}
  className="md:w-1/2 h-96 relative bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-xl overflow-hidden"
  style={{ perspective: 600 }}
>
  {[...Array(5)].map((_, i) => {
    const size = 40 + i * 15;
    const color = ["#3b82f6", "#9333ea", "#f59e0b", "#10b981", "#ef4444"][i];

    return (
      <div
        key={i}
        style={{
          width: size,
          height: size,
          borderRadius: "9999px",
          background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate3d(${pos.x * (10 - i)}px, ${pos.y * (10 - i)}px, 0) translate(-50%, -50%)`,
          transition: "transform 0.1s ease-out",
          filter: "blur(8px)",
          opacity: 0.7,
          zIndex: i,
        }}
      />
    );
  })}
</div>

    </section>
  );
};

export default Contact;
