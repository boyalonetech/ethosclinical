"use client";
import { CONTACT_INFO } from "@/app/data/contact";
import { Mail, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className="py-10  lg:px-10 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-mintl lg:rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ── LEFT: Contact info ── */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between gap-12">
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-tight">
                  Get in touch
                </h1>
              </div>

              <div className="flex flex-col gap-8">
                {CONTACT_INFO.map(
                  ({ icon: Icon, label, value, href, underline }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-5 group"
                    >
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:bg-stone-100 transition-colors">
                        <Icon size={22} className="text-mintl" />
                      </div>
                      <span
                        className={`text-white text-lg font-normal leading-relaxed ${
                          underline ? "underline underline-offset-2" : ""
                        }`}
                      >
                        {value}
                      </span>
                    </a>
                  ),
                )}
              </div>

              {/* Decorative dots */}
              <div className="hidden lg:grid grid-cols-3 gap-3 w-fit">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
                ))}
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="bg-white rounded-2xl my-3 sm:m-4 lg:m-6 p-8 sm:p-10 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl sm:text-4xl font-normal text-stone-900">
                  Write a Message
                </h2>
                <p className="text-stone-500 text-base leading-relaxed">
                  Got a question, feedback, or just want to say hello? We&apos;d love
                  to hear from you!
                </p>
              </div>

              <form
                className="flex flex-col gap-6"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Name + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Full Name <span className="text-gray-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full border-b border-stone-300 focus:border-mintl outline-none py-2.5 text-stone-900 text-base placeholder-stone-300 bg-transparent transition-colors"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Phone Number <span className="text-gray-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={14}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0491 046 780"
                        className="w-full border-b border-stone-300 focus:border-mintl outline-none py-2.5 pl-5 text-stone-900 text-base placeholder-stone-300 bg-transparent transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    Email Address <span className="text-gray-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full border-b border-stone-300 focus:border-mintl outline-none py-2.5 pl-5 text-stone-900 text-base placeholder-stone-300 bg-transparent transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    Message <span className="text-gray-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full border-b border-stone-300 focus:border-mintl outline-none py-2.5 text-stone-900 text-base placeholder-stone-300 bg-transparent transition-colors resize-none"
                    required
                  />
                </div>

                {/* Privacy checkbox */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`w-5 h-5 mt-0.5 rounded border shrink-0 flex items-center justify-center transition-colors ${
                      agreed
                        ? "bg-mintl border-mintl"
                        : "border-gray-500 bg-white"
                    }`}
                  >
                    {agreed && (
                      <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                        <path
                          d="M1 5l3 3 7-7"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-mintl text-sm leading-relaxed">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-gray-500 hover:text-mintl underline underline-offset-2 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!agreed}
                  className="bg-mintl hover:bg-mintl disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 self-start"
                >
                  Send Message <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
