"use client";

import { db } from "@/backend/server";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Phone,
  Mail,
  UserCircle,
  Users,
  Building2,
  Monitor,
  MapPin,
  PhoneCall,
  X,
  Eye,
  CalendarCheck,
  Layers,
  Radio,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Constants with actual Lucide icons
const SESSION_TYPES = [
  {
    icon: UserCircle,
    label: "Individual",
    desc: "One-on-one clinical supervision tailored to your specific practice needs and professional development goals.",
    duration: "60 minutes",
  },
  {
    icon: Users,
    label: "Group",
    desc: "Collaborative supervision with peers, ideal for sharing insights and building collective capacity.",
    duration: "90 minutes",
  },
  {
    icon: Building2,
    label: "Organisational",
    desc: "Supervision for teams or organisations, focusing on systemic issues and workplace wellbeing.",
    duration: "120 minutes",
  },
];

const DELIVERY_MODES = [
  { icon: Monitor, label: "Online (Zoom)" },
  { icon: MapPin, label: "In Person (Brisbane)" },
  { icon: PhoneCall, label: "Phone Consultation" },
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

const ACCENT = "#8e9867";

interface BookingFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  context: string;
}

export default function BookingForm() {
  const [sessionType, setSessionType] = useState("Individual");
  const [deliveryMode, setDeliveryMode] = useState("Online (Zoom)");
  const [preferredDate, setPreferredDate] = useState("");
  const [alternateDate, setAlternateDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  const [form, setForm] = useState<BookingFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organisation: "",
    role: "",
    context: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!agreed) {
      setError("Please agree to the privacy policy");
      return;
    }
    if (!form.firstName || !form.lastName || !form.email || !form.context) {
      setError("Please fill in all required fields");
      return;
    }
    if (!preferredDate || !selectedSlot) {
      setError("Please select preferred date and time slot");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const bookingData = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || "",
        organisation: form.organisation || "",
        role: form.role || "",
        context: form.context,
        sessionType,
        deliveryMode,
        preferredDate,
        alternateDate: alternateDate || "",
        preferredTimeSlot: selectedSlot,
        createdAt: new Date().toISOString(),
      };

      const record = await db.collection("bookings").create(bookingData);
      console.log("Booking created successfully:", record);
      setSubmitted(true);
      setShowSidebar(true);
    } catch (err: unknown) {
      console.error("Error creating booking:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit booking. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organisation: "",
      role: "",
      context: "",
    });
    setPreferredDate("");
    setAlternateDate("");
    setSelectedSlot("");
    setAgreed(false);
    setSubmitted(false);
    setShowSidebar(false);
  };

  return (
    <>
      <section className="py-14 px-0 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header row with eye icon */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex px-6 lg:px-0  items-center gap-2">
              <div
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <p className="text-sm  font-semibold uppercase tracking-widest text-gray-600">
                Book Your Session
              </p>
            </div>

            {/* Eye icon — opens sidebar to preview booking summary */}
            {submitted && (
              <button
                onClick={() => setShowSidebar(true)}
                title="View booking summary"
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition-all duration-200"
              >
                <Eye size={15} />
                View Summary
              </button>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div
              ref={errorRef}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── LEFT SIDEBAR ── */}
            <div className="flex flex-col gap-6">
              {/* Session type */}
              <div className="bg-white lg:rounded-2xl lg:border border-gray-200 p-6 flex flex-col gap-4">
                <h3 className="font-semibold text-base text-black">
                  Session Type
                </h3>
                <div className="flex flex-col gap-3">
                  {SESSION_TYPES.map(
                    ({ icon: Icon, label, desc, duration }) => {
                      const active = sessionType === label;
                      return (
                        <button
                          key={label}
                          onClick={() => setSessionType(label)}
                          className="w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-2"
                          style={{
                            backgroundColor: active ? "#f9f9f7" : "white",
                            borderColor: active ? ACCENT : "#e5e7eb",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon
                                size={15}
                                style={{ color: active ? ACCENT : "#9ca3af" }}
                              />
                              <span
                                className="text-sm font-semibold"
                                style={{ color: active ? ACCENT : "#4b5563" }}
                              >
                                {label}
                              </span>
                            </div>
                            <div
                              className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                              style={{
                                borderColor: active ? ACCENT : "#d1d5db",
                              }}
                            >
                              {active && (
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: ACCENT }}
                                />
                              )}
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-black/90">
                            {desc}
                          </p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1 text-gray-500">
                              <Clock size={10} />
                              {duration}
                            </span>
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Delivery mode */}
              <div className="bg-white rounded-2xl lg:border border-gray-200 p-6 flex flex-col gap-4">
                <h3 className="font-semibold text-base text-black">
                  Delivery Mode
                </h3>
                <div className="flex flex-col gap-2">
                  {DELIVERY_MODES.map(({ icon: Icon, label }) => {
                    const active = deliveryMode === label;
                    return (
                      <button
                        key={label}
                        onClick={() => setDeliveryMode(label)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all"
                        style={{
                          backgroundColor: active ? "#f9f9f7" : "white",
                          borderColor: active ? ACCENT : "#e5e7eb",
                          color: active ? ACCENT : "#4b5563",
                        }}
                      >
                        <Icon
                          size={15}
                          style={{ color: active ? ACCENT : "#9ca3af" }}
                        />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact info */}
              <div className="bg-white lg:shadow lg:rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-gray-900 text-xs uppercase tracking-widest font-medium">
                  Need help?
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: Phone,
                      value: "0491 046 780",
                      href: "tel:0491046780",
                    },
                    {
                      icon: Mail,
                      value: "stephenonyekwere@gmail.com",
                      href: "mailto:stephenonyekwere@gmail.com",
                    },
                  ].map(({ icon: Icon, value, href }) => (
                    <a
                      key={value}
                      href={href}
                      className="flex items-center gap-3 text-gray-700 text-sm hover:text-mint transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: ACCENT }}
                      >
                        <Icon size={14} className="text-gray-50" />
                      </div>
                      {value}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── MAIN FORM ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Date & Time */}
              <div className="bg-white lg:rounded-2xl lg:border border-gray-200 p-6 flex flex-col gap-5">
                <h3 className="font-semibold text-base flex items-center gap-2 text-black">
                  <Calendar size={16} className="text-gray-500" /> Preferred
                  Date & Time
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                      Preferred Date <span style={{ color: ACCENT }}>*</span>
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full border-b border-gray-200 focus:border-gray-400 outline-none py-2.5 text-sm text-gray-600 bg-transparent transition-colors"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-black">
                      Alternate Date
                    </label>
                    <input
                      type="date"
                      value={alternateDate}
                      onChange={(e) => setAlternateDate(e.target.value)}
                      className="w-full border-b border-gray-200 focus:border-gray-400 outline-none py-2.5 text-sm text-gray-600 bg-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                    Preferred Time Slot <span style={{ color: ACCENT }}>*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className="px-3 py-1.5 rounded-lg border text-sm font-medium transition-all"
                          style={{
                            backgroundColor: active ? ACCENT : "white",
                            borderColor: active ? ACCENT : "#e5e7eb",
                            color: active ? "white" : "#4b5563",
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Personal details */}
              <div className="bg-white lg:rounded-2xl lg:border border-gray-200 p-6 flex flex-col gap-5">
                <h3 className="font-semibold text-base flex items-center gap-2 text-black">
                  <User size={16} className="text-gray-500" /> Your Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      name: "firstName",
                      label: "First Name",
                      placeholder: "Jane",
                    },
                    {
                      name: "lastName",
                      label: "Last Name",
                      placeholder: "Smith",
                    },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                        {label} <span style={{ color: ACCENT }}>*</span>
                      </label>
                      <input
                        type="text"
                        name={name}
                        value={form[name as keyof BookingFormState] as string}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full border-b border-gray-200 focus:border-gray-400 outline-none py-2.5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent transition-colors"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                      Email <span style={{ color: ACCENT }}>*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        size={13}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full border-b border-gray-200 focus:border-gray-400 outline-none py-2.5 pl-5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        size={13}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0491 000 000"
                        className="w-full border-b border-gray-200 focus:border-gray-400 outline-none py-2.5 pl-5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                      Organisation (if applicable)
                    </label>
                    <input
                      type="text"
                      name="organisation"
                      value={form.organisation}
                      onChange={handleChange}
                      placeholder="e.g. Family Spirit"
                      className="w-full border-b border-gray-200 focus:border-gray-400 outline-none py-2.5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                      Your Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="e.g. Therapeutic Specialist"
                      className="w-full border-b border-gray-200 focus:border-gray-400 outline-none py-2.5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                    What brings you to supervision?{" "}
                    <span style={{ color: ACCENT }}>*</span>
                  </label>
                  <textarea
                    name="context"
                    value={form.context}
                    onChange={handleChange}
                    placeholder="Share a little about your practice context, what you're hoping to work on, or any specific challenges you're navigating…"
                    rows={4}
                    className="w-full border-b border-gray-200 focus:border-gray-400 outline-none py-2.5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent transition-colors resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className="w-5 h-5 mt-0.5 rounded border shrink-0 flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: agreed ? ACCENT : "white",
                      borderColor: agreed ? ACCENT : "#d1d5db",
                    }}
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
                  <span className="text-sm leading-relaxed text-gray-600">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="underline underline-offset-2 transition-colors"
                      style={{ color: ACCENT }}
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to Ethos Clinical Supervision contacting me to
                    confirm this booking.
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs leading-relaxed max-w-xs text-gray-400">
                    You&apos;ll receive a confirmation within 24 hours.
                  </p>
                  <button
                    disabled={!agreed || isSubmitting}
                    onClick={handleSubmit}
                    className="disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-7 py-3.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
                    style={{ backgroundColor: ACCENT }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLButtonElement).style.backgroundColor =
                        "#000")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLButtonElement).style.backgroundColor =
                        ACCENT)
                    }
                  >
                    {isSubmitting ? "Submitting..." : "Request Booking"}
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIDEBAR MODAL ── */}
      {/* Backdrop */}
      <div
        onClick={() => setShowSidebar(false)}
        className="fixed inset-0 transition-all z-50 duration-300"
        style={{
          backgroundColor: showSidebar ? "rgba(0,0,0,0.45)" : "transparent",
          pointerEvents: showSidebar ? "auto" : "none",
          backdropFilter: showSidebar ? "blur(2px)" : "none",
        }}
      />

      {/* Sidebar panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ease-in-out"
        style={{
          width: "min(440px, 100vw)",
          transform: showSidebar ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-gray-100"
          style={{ backgroundColor: ACCENT }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-base leading-none">
                Booking Confirmed
              </p>
              <p className="text-white/70 text-xs mt-0.5">
                Summary of your request
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSidebar(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          {/* Success message */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-5">
            <p className="text-black text-sm leading-relaxed">
              Thank you,{" "}
              <span className="font-semibold">{form.firstName || "there"}</span>
              ! your request has been sent and will be reviewed.
            </p>
          </div>

          {/* Booking details */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Booking Details
            </p>

            {/* Session & Delivery */}
            <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                <Layers
                  size={14}
                  style={{ color: ACCENT }}
                  className="shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Session Type</p>
                  <p className="text-sm font-medium text-black">
                    {sessionType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                <Radio
                  size={14}
                  style={{ color: ACCENT }}
                  className="shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Delivery Mode</p>
                  <p className="text-sm font-medium text-black">
                    {deliveryMode}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                <CalendarCheck
                  size={14}
                  style={{ color: ACCENT }}
                  className="shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Preferred Date</p>
                  <p className="text-sm font-medium text-black">
                    {preferredDate
                      ? new Date(preferredDate).toLocaleDateString("en-AU", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </p>
                </div>
              </div>
              {alternateDate && (
                <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                  <Calendar
                    size={14}
                    style={{ color: ACCENT }}
                    className="shrink-0"
                  />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">
                      Alternate Date
                    </p>
                    <p className="text-sm font-medium text-black">
                      {new Date(alternateDate).toLocaleDateString("en-AU", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                <Clock
                  size={14}
                  style={{ color: ACCENT }}
                  className="shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Time Slot</p>
                  <p className="text-sm font-medium text-black">
                    {selectedSlot || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Your Details
            </p>
            <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                <User
                  size={14}
                  style={{ color: ACCENT }}
                  className="shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Full Name</p>
                  <p className="text-sm font-medium text-black">
                    {[form.firstName, form.lastName]
                      .filter(Boolean)
                      .join(" ") || "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                <Mail
                  size={14}
                  style={{ color: ACCENT }}
                  className="shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-black">
                    {form.email || "—"}
                  </p>
                </div>
              </div>
              {form.phone && (
                <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                  <Phone
                    size={14}
                    style={{ color: ACCENT }}
                    className="shrink-0"
                  />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-black">
                      {form.phone}
                    </p>
                  </div>
                </div>
              )}
              {form.organisation && (
                <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                  <Building2
                    size={14}
                    style={{ color: ACCENT }}
                    className="shrink-0"
                  />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Organisation</p>
                    <p className="text-sm font-medium text-black">
                      {form.organisation}
                    </p>
                  </div>
                </div>
              )}
              {form.role && (
                <div className="flex items-center gap-3 px-4 py-3.5 bg-white">
                  <UserCircle
                    size={14}
                    style={{ color: ACCENT }}
                    className="shrink-0"
                  />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Role</p>
                    <p className="text-sm font-medium text-black">
                      {form.role}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Context */}
          {form.context && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Your Context
              </p>
              <div className="rounded-xl border border-gray-100 px-4 py-4 bg-white">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {form.context}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3 bg-white">
          <button
            onClick={handleResetForm}
            className="w-full text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
            style={{ backgroundColor: ACCENT }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#000")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = ACCENT)
            }
          >
            Make Another Booking
          </button>
          <button
            onClick={() => setShowSidebar(false)}
            className="w-full border border-black text-black text-sm font-medium px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
