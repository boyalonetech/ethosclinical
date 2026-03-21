"use client";

import { ArrowRight } from "lucide-react";
import { AvatarStack } from "./Avatar";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Elegant rotating image set for the hero animation
const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=1600&q=80",
    alt: "Clinical supervision session",
    gradient: "from-[#2c5f2d]/20 to-[#97bc62]/10",
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
    alt: "Therapist in deep conversation",
    gradient: "from-[#1e3c72]/20 to-[#2a5298]/10",
  },
  {
    url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=80",
    alt: "Supportive clinical team",
    gradient: "from-[#5d2e8c]/20 to-[#b56576]/10",
  },
  {
    url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1600&q=80",
    alt: "Mindful supervision setting",
    gradient: "from-[#0f2027]/20 to-[#203a43]/10",
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax and opacity effects based on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentImage = heroImages[currentImageIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-stone-50 pt-20 pb-12 px-6 lg:px-10 overflow-hidden"
    >
      {/* Background gradient overlay that changes with image */}
      <motion.div
        key={currentImageIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className={`absolute inset-0 bg-gradient-to-br pointer-events-none z-0`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-center text-center gap-6"
        >
          {/* Animated AvatarStack with subtle entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AvatarStack />
          </motion.div>

          {/* Main heading with elegant fade-up */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-stone-900 leading-tight max-w-4xl font-['Geist',sans-serif] tracking-tight"
          >
            Clinical Supervision That Makes a{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Real Difference</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-0  left-0 h-3 bg-mint/30 -z-0 rounded-full"
              />
            </span>{" "}
            in Practice
          </motion.h1>
    
          {/* Description with staggered reveal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-stone-700 max-w-2xl leading-relaxed"
          >
            Your frontline staff are carrying extraordinary weight. They deserve
            supervision that honours that reality.
          </motion.p>

          {/* Animated CTA Button with hover effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
              className="group bg-mint hover:bg-mint/90 cursor-pointer text-white text-base font-medium px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-mint/20"
            >
              Book a Counsellor
              <motion.div
                animate={{ x: isHoveringButton ? 6 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>

        {/* Hero Image Section with cinematic transitions */}
        <motion.div
          style={{ scale: imageScale }}
          className="w-full mt-12 lg:mt-16 rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <div className="relative aspect-[16/9] sm:aspect-[16/7] bg-stone-200">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage.url}
                src={currentImage.url}
                alt={currentImage.alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent pointer-events-none" />

            {/* Subtle image counter indicator */}
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className="group focus:outline-none"
                  aria-label={`View image ${idx + 1}`}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentImageIndex
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/50 group-hover:bg-white/80"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Decorative abstract elements */}
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-mint/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-stone-300/20 rounded-full blur-3xl -z-10 animate-pulse-slow animation-delay-1000" />
      </div>
    </section>
  );
}
