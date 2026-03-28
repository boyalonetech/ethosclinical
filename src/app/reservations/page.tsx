"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Heart,
  Baby,
  Coffee,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tickets: 1,
    needsChildcare: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "payment" | "success">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayment = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("API Error");

      setIsSubmitting(false);
      setStep("success");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error("Failed to confirm payment. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div className="lg:h-screen min-h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row font-sans text-stone-800 selection:bg-[#8c9c74] selection:text-white">
      {/* Left Column - Conference Details - Full Screen Height */}
      <div
        className={`w-full lg:w-[66%] xl:w-[67%] lg:h-screen lg:overflow-y-auto lg:overflow-x-hidden bg-[#F9F8F5] p-8 md:p-12 lg:p-6 lg:px-10 xl:p-14 relative flex-col justify-between ${step !== "form" ? "hidden lg:flex" : "flex"}`}
      >
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#8c9c74]/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#916b5a]/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-full bg-[#8c9c74] flex items-center justify-center text-white shadow-sm">
                <Heart size={16} strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-[13px] tracking-[0.15em] uppercase text-stone-600">
                Ethos Clinical Supervision
              </span>
            </div>

            <div className="inline-block border border-[#8c9c74]/20 text-[#718258] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-white/60 backdrop-blur-sm">
              Conference 2026
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-stone-900 leading-[1.1] mb-6 tracking-tight">
              Western Sydney Faith-Based Psychosocial Mental Health Conference
            </h1>
            <p className="text-xl md:text-2xl text-stone-500 font-light leading-snug max-w-2xl border-l-[3px] border-[#916b5a]/40 pl-6 rounded-sm">
              Building Strong Marriages in Changing Times.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-10 lg:gap-14 mb-14">
            {/* Theme & Learnings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-3 border-b border-stone-200/80 pb-3">
                  The Theme
                </h3>
                <p className="text-[17px] font-medium text-stone-800 leading-relaxed">
                  Faith • Intimacy • Resilience • Emotional wellbeing
                </p>
              </div>

              <div>
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-3 border-b border-stone-200/80 pb-3">
                  You&apos;ll Learn
                </h3>
                <p className="text-stone-600 leading-relaxed text-[15px]">
                  Gain practical tools to navigate financial and emotional
                  stress as a team. Discover renewed insights into healthy
                  intimacy and communication strategies to sustain connection
                  amid life&apos;s pressures. Build resilient relationships
                  grounded in love and mutual respect.
                </p>
              </div>
            </motion.div>

            {/* Speaker & Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-3 border-b border-stone-200/80 pb-3">
                  Keynote Speaker
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#e5e1db] rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-white shadow-sm mt-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/stephen.jpeg"
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900">
                      Rev. Stephen C. Onyekwere
                    </h4>
                    <p className="text-[#8c9c74] font-medium text-[13px] tracking-wide uppercase mt-0.5">
                      Therapeutic Specialist
                    </p>
                  </div>
                </div>
              </div>

              <blockquote className="relative pt-2">
                <span className="absolute top-0 -left-2 text-5xl text-[#916b5a]/10 font-serif leading-none">
                  &quot;
                </span>
                <p className="italic text-stone-600 font-serif text-[19px] leading-relaxed relative z-10 pl-5 border-l-2 border-[#916b5a]/20">
                  Strong marriages are built not by avoiding life&apos;s storms,
                  but by learning to walk through them together.
                </p>
              </blockquote>
            </motion.div>
          </div>
        </div>

        {/* Footer Info Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative z-10 mt-auto pt-8 border-t border-stone-200/60"
        >
          <div className="flex flex-wrap lg:flex-nowrap gap-8 md:gap-12">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-stone-100">
                <Calendar className="text-[#8c9c74] w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm">
                  Fri 24th April, 2026
                </h4>
                <p className="text-stone-500 text-sm mt-0.5">7:00pm - 9:00pm</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-stone-100">
                <MapPin className="text-[#8c9c74] w-4 h-4 text-center ml-0.5" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm">
                  St Andrews Marayong Church Hall
                </h4>
                <p className="text-stone-500 text-sm mt-0.5 leading-relaxed">
                  36-40 Breakfast Road, Marayong NSW 2148
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <div className="flex items-center gap-2 text-[12px] font-semibold tracking-wide uppercase text-stone-600 bg-white/80 px-4 py-2 rounded-full border border-stone-200/80 shadow-sm backdrop-blur-md">
              <Coffee size={14} className="text-[#916b5a]" /> Refreshments
              served
            </div>
            <div className="flex items-center gap-2 text-[12px] font-semibold tracking-wide uppercase text-stone-600 bg-white/80 px-4 py-2 rounded-full border border-stone-200/80 shadow-sm backdrop-blur-md">
              <Baby size={14} className="text-[#8c9c74]" /> Child care on-site
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Form - Full Screen Height */}
      <div className="w-full lg:w-[44%] xl:w-[33%] lg:h-screen lg:overflow-y-auto lg:overflow-x-hidden bg-white p-8 md:p-12 lg:p-0 xl:py-0 flex flex-col relative min-h-screen lg:min-h-0 z-10">
        <div className="max-w-[440px] w-full mx-auto my-auto py-10 lg:py-12">
          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Conference Hall Banner */}
                <div className="w-full aspect-video rounded-[1.25rem] overflow-hidden mb-10 shadow-sm border border-stone-200/50 relative group">
                  <div className="absolute inset-0 bg-[#8c9c74]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"
                    alt="Beautiful Conference Hall Setup"
                    fill
                    unoptimized
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </div>

                <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-3xl lg:text-[2.5rem] font-bold text-stone-900 mb-3 tracking-tight">
                    Reserve Seat
                  </h2>
                  <p className="text-stone-500 text-[15px] leading-relaxed">
                    Secure your exclusive attendance. Fill out the details
                    below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold tracking-[0.1em] uppercase text-stone-500 ml-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-[#fcfbf9] border border-stone-200 text-stone-900 text-[15px] rounded-xl focus:bg-white focus:ring-4 focus:ring-[#8c9c74]/10 focus:border-[#8c9c74]/50 px-4 py-3.5 outline-none transition-all placeholder:text-stone-400"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold tracking-[0.1em] uppercase text-stone-500 ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#8c9c74]">
                        <Mail
                          size={18}
                          className="text-stone-400 group-focus-within:text-[#8c9c74] transition-colors"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#fcfbf9] border border-stone-200 text-stone-900 text-[15px] rounded-xl focus:bg-white focus:ring-4 focus:ring-[#8c9c74]/10 focus:border-[#8c9c74]/50 pl-12 pr-4 py-3.5 outline-none transition-all placeholder:text-stone-400"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold tracking-[0.1em] uppercase text-stone-500 ml-1">
                        Phone Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone
                            size={18}
                            className="text-stone-400 group-focus-within:text-[#8c9c74] transition-colors"
                          />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[#fcfbf9] border border-stone-200 text-stone-900 text-[15px] rounded-xl focus:bg-white focus:ring-4 focus:ring-[#8c9c74]/10 focus:border-[#8c9c74]/50 pl-12 pr-4 py-3.5 outline-none transition-all placeholder:text-stone-400"
                          placeholder="0400 000 000"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5 w-[110px]">
                      <label className="text-[12px] font-bold tracking-[0.1em] uppercase text-stone-500 ml-1">
                        Tickets
                      </label>
                      <select
                        name="tickets"
                        value={formData.tickets}
                        onChange={handleChange}
                        className="w-full bg-[#fcfbf9] border border-stone-200 text-stone-900 text-[15px] rounded-xl focus:bg-white focus:ring-4 focus:ring-[#8c9c74]/10 focus:border-[#8c9c74]/50 px-4 py-3.5 outline-none transition-all appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-4 p-5 border border-stone-200/80 bg-stone-50/50 rounded-2xl cursor-pointer hover:bg-stone-50 hover:border-stone-300 transition-all group">
                      <div className="relative flex items-center justify-center mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          name="needsChildcare"
                          checked={formData.needsChildcare}
                          onChange={handleChange}
                          className="peer w-6 h-6 appearance-none border-2 border-stone-300 rounded-[6px] focus:ring-4 focus:ring-[#8c9c74]/20 focus:outline-none checked:bg-[#8c9c74] checked:border-[#8c9c74] transition-all cursor-pointer"
                        />
                        <svg
                          className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                          I will require on-site child care
                        </span>
                        <span className="text-[13px] text-stone-500 mt-1 leading-relaxed">
                          Available for children safely on-site during the event
                          hours.
                        </span>
                      </div>
                    </label>
                  </div>

                  <div className="pt-6 mt-6">
                    <button
                      type="submit"
                      className="w-full bg-brown hover:bg-[#8c9c74] text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(140,156,116,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-3 text-[16px] group"
                    >
                      <>
                        Proceed to Payment{" "}
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    </button>

                    <p className="text-center text-[13px] text-stone-400 mt-6 font-medium">
                      For registration enquiries, text or call {""}
                      <a
                        href="tel:0491046780"
                        className="font-semibold text-stone-700"
                      >
                        0491 046 780
                      </a>
                    </p>
                  </div>
                </form>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center py-10 flex flex-col items-center justify-center h-full min-h-[400px]"
              >
                <h2 className="text-[2rem] font-bold text-stone-900 mb-4 tracking-tight">
                  Complete Payment
                </h2>
                <p className="text-[16px] text-stone-500 mb-8 leading-relaxed max-w-[340px] mx-auto">
                  To finalise your reservation, please transfer the fee of
                  <span className="font-bold text-stone-800">
                    {" "}
                    ${formData.tickets * 400} ({formData.tickets}{" "}
                    {formData.tickets === 1 ? "ticket" : "tickets"}, $400 for
                    each couple)
                  </span>
                  .
                </p>

                <div className="bg-stone-50/80 border border-stone-200/50 rounded-xl p-5 mb-10 w-full max-w-[340px] text-left mx-auto">
                  <h3 className="text-[13px] font-bold tracking-widest uppercase text-stone-600 mb-3 border-b border-stone-200 pb-2">
                    Payment Details
                  </h3>
                  <div className="space-y-2 text-[14.5px]">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Account Name:</span>
                      <span className="font-semibold text-stone-800">
                        Ethos Clinical
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">BSB:</span>
                      <span className="font-semibold text-stone-800">
                        123-456
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Account Number:</span>
                      <span className="font-semibold text-stone-800">
                        1234 5678
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  className="w-full max-w-[340px] h-14 bg-[#8c9c74] hover:bg-[#7a8863] text-white rounded-xl text-[16px] font-semibold tracking-wide transition-all shadow-md shadow-[#8c9c74]/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    "Payment Made"
                  )}
                </button>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center py-10 flex flex-col items-center justify-center h-full min-h-[400px]"
              >
                <div className="w-24 h-24 bg-[#8c9c74]/10 rounded-full flex items-center justify-center mb-8 mx-auto relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 size={48} className="text-[#8c9c74]" />
                  </motion.div>
                </div>
                <h2 className="text-[2rem] font-bold text-stone-900 mb-4 tracking-tight">
                  Request Received!
                </h2>
                <p className="text-[16px] text-stone-500 mb-8 leading-relaxed max-w-[340px] mx-auto">
                  Thank you,{" "}
                  <span className="font-semibold text-stone-800">
                    {formData.fullName}
                  </span>
                  . Your request has been sent. You will receive a digital
                  ticket on your email upon approval.
                </p>

                <button
                  onClick={() => {
                    setStep("form");
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      tickets: 1,
                      needsChildcare: false,
                    });
                  }}
                  className="px-8 py-3.5 border border-stone-200 rounded-xl text-stone-600 font-semibold hover:bg-stone-50 hover:text-stone-900 transition-all text-[14px] shadow-sm active:scale-95"
                >
                  Register another attendee
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
