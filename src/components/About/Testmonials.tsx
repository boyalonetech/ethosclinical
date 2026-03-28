"use client";
import { TESTIMONIALS } from "@/app/data/about";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// Custom hook for infinite scroll
const useInfiniteScroll = (speed = 1, pauseOnHover = true) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  const startScrolling = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const scroll = () => {
      if (!containerRef.current) return;

      if (isPlaying) {
        scrollPositionRef.current += currentSpeed;

        // Reset when reaching the end of duplicated content
        if (scrollPositionRef.current >= containerRef.current.scrollWidth / 3) {
          scrollPositionRef.current = 0;
        }

        containerRef.current.scrollLeft = scrollPositionRef.current;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
  }, [isPlaying, currentSpeed]);

  const stopScrolling = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    startScrolling();
    return stopScrolling;
  }, [startScrolling, stopScrolling]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPlaying(true);
  };

  return {
    containerRef,
    handleMouseEnter,
    handleMouseLeave,
    setCurrentSpeed,
    currentSpeed,
    isPlaying,
    setIsPlaying,
  };
};

export default function Testimonials() {
  const {
    containerRef,
    handleMouseEnter,
    handleMouseLeave,
    setCurrentSpeed,
    currentSpeed,
    setIsPlaying,
    isPlaying,
  } = useInfiniteScroll(1.2, true);

  const duplicatedTestimonials = [
    ...TESTIMONIALS,
    ...TESTIMONIALS,
    ...TESTIMONIALS,
  ];

  return (
    <section className="bg-gradient-to-br from-stone-50 to-stone-100 py-20 px-0 lg:px-0 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-brown/5 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-brown rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-brown uppercase tracking-wider">
                Testimonials
              </span>
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 font-['Bona_Nova',serif] tracking-tight mb-4">
            Don&apos;t just take our word for it.
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Explore the experiences of practitioners and organisations who have
            benefited from reflective, ethically grounded clinical supervision.
          </p>
        </div>

        {/* Scroll Controls Bar */}
        <div className=" justify-between hidden items-center mb-6 px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-stone-200 hover:bg-stone-300 transition-all duration-200 shadow-sm"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Speed</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={currentSpeed}
                onChange={(e) => setCurrentSpeed(parseFloat(e.target.value))}
                className="w-24 h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs font-mono text-stone-600 w-10">
                {currentSpeed.toFixed(1)}x
              </span>
            </div>
          </div>

          <div className="text-xs text-stone-400 hidden sm:block">
            Hover to pause • Infinite scroll
          </div>
        </div>

        {/* Scrolling Container */}
        <div
          ref={containerRef}
          className="overflow-x-auto h-120 pt-12 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex gap-6 py-10 px-0"
            style={{ width: "max-content" }}
          >
            {duplicatedTestimonials.map(({ quote, name, role, color }, i) => (
              <div
                key={`${i}-${name}`}
                className={`${color} w-80 md:w-96 scale-90 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:scale-105 hover:shadow-2xl shrink-0 group`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${(i % TESTIMONIALS.length) * 0.1}s both`,
                }}
              >
                <div className="flex justify-between items-start">
                  <Quote
                    size={24}
                    className="text-white/40 group-hover:text-white/60 transition-colors"
                  />
                  <div className="text-white/20 text-xs font-mono">
                    #{(i % TESTIMONIALS.length) + 1}
                  </div>
                </div>

                <p className="text-white text-sm leading-relaxed flex-1 line-clamp-6">
                  {quote}
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-white/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 overflow-hidden shrink-0 ring-2 ring-white/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${
                        [
                          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
                          "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=100&q=80",
                          "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&q=80",
                          "/test2.jpg",
                          "/test3.jpg",
                        ][i % 5]
                      }`}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{name}</p>
                    <p className="text-white/60 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlays for better UX */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
