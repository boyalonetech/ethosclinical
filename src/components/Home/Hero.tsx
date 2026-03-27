  "use client";

  import { ArrowRight } from "lucide-react";
  import { AvatarStack } from "./Avatar";
  import { useEffect, useRef, useState } from "react";
  import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
    type Variants, // ← add this
  } from "framer-motion";
  // Elegant rotating image set for the hero animation
  const heroImages = [
    {
      url: "/hero.jpg",
      alt: "Clinical supervision session",
      gradient: "from-[#2c5f2d]/20 to-[#97bc62]/10",
    },
    {
      url: "/hero1.jpg",
      alt: "Therapist in deep conversation",
      gradient: "from-[#1e3c72]/20 to-[#2a5298]/10",
    },
    {
      url: "/hero2.jpg",
      alt: "Supportive clinical team",
      gradient: "from-[#5d2e8c]/20 to-[#b56576]/10",
    },
    {
      url: "/hero3.jpg",
      alt: "Mindful supervision setting",
      gradient: "from-[#0f2027]/20 to-[#203a43]/10",
    },
    {
      url: "/hero4.jpg",
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
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Rotate images every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    const currentImage = heroImages[currentImageIndex];

    const imageSlideVariants: Variants = {
      enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
        rotateY: direction > 0 ? -15 : 15,
      }),
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1] as const, // ← add "as const"
        },
      },
      exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
        scale: 0.8,
        rotateY: direction > 0 ? 15 : -15,
        transition: {
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1] as const, // ← add "as const"
        },
      }),
    };

    return (
        <section
          ref={containerRef}
          className="relative bg-stone-50 pt-20 pb-12 px-6 lg:px-10 overflow-hidden min-h-screen"
        >
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
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-stone-900 leading-tight max-w-4xl font-['Geist',sans-serif] tracking-tight"
            >
              Clinical Supervision That Makes a{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Real Difference</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute h-1.5 bottom-0 left-0 lg:h-3 bg-mint/30 z-0 rounded-full"
                />
              </span>{" "}
              in Practice
            </motion.h1>

            {/* Description with staggered reveal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-stone-700 max-w-2xl leading-relaxed"
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
                className="group bg-mint hover:bg-brown cursor-pointer text-white text-base font-medium px-8 py-4 rounded-md transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-mint/20"
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

          {/* Hero Image Section with modern cinematic transitions */}
          <motion.div
            style={{ scale: imageScale }}
            className="w-full mt-12 lg:mt-16 rounded-2xl overflow-hidden relative group"
          >
            <div className="relative w-full aspect-video">
              <AnimatePresence mode="wait" custom={currentImageIndex}>
                {/* Modern Slide + Fade + Scale Transition */}
                <motion.img
                  key={currentImage.url}
                  src={currentImage.url}
                  alt={currentImage.alt}
                  custom={currentImageIndex}
                  variants={imageSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl object-cover"
                  style={{ willChange: "transform, opacity" }}
                />
              </AnimatePresence>

              {/* Dynamic gradient overlay that changes with image */}
              <motion.div
                key={`gradient-${currentImageIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className={`absolute inset-0 bg-gradient-to-t  pointer-events-none rounded-2xl`}
              />

              {/* Modern glass morphism overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/0 group-hover:from-black/10 group-hover:via-black/5 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />

              {/* Enhanced image counter indicator with modern styling */}
              <div className="absolute bottom-6 right-6 flex gap-2 z-10 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className="group focus:outline-none"
                    aria-label={`View image ${idx + 1}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        idx === currentImageIndex
                          ? "w-8 bg-white shadow-lg"
                          : "w-2 bg-white/50 group-hover:bg-white/80"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Modern image counter text */}
              <div className="absolute bottom-6 left-6 z-10 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm font-medium">
                {String(currentImageIndex + 1).padStart(2, "0")} /{" "}
                {String(heroImages.length).padStart(2, "0")}
              </div>
            </div>
          </motion.div>

          {/* Decorative abstract elements with modern animations */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-0 w-64 h-64 bg-mint/5 rounded-full blur-3xl -z-10"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/4 right-0 w-80 h-80 bg-stone-300/20 rounded-full blur-3xl -z-10"
          />
        </div>
      </section>
    );
  }
