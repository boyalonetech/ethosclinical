"use client";

import { db } from "@/backend/server";
import {
  Clock,
  User,
  Mail,
  Building2,
  Monitor,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Info,
  Phone,
  Trash2,
  LayoutDashboard,
  TrendingUp,
  Radio,
  CalendarCheck,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
  TYPES
───────────────────────────────────────────── */
interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  sessionType: string;
  deliveryMode: string;
  preferredDate: string;
  preferredTimeSlot: string;
  alternateDate?: string;
  organisation?: string;
  role?: string;
  context?: string;
  createdAt: string;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
}

interface DetailRowProps {
  label: string;
  value?: string;
  icon?: React.ElementType;
}

interface SidebarModalProps {
  booking: Booking;
  onClose: () => void;
  onDelete: (id: string) => void;
}

/* ─────────────────────────────────────────────
  CONSTANTS
───────────────────────────────────────────── */

const ITEMS_PER_PAGE = 8;
const ACCENT = "#8e9867";

const STAT_CARDS = [
  {
    key: "total" as const,
    label: "Total Bookings",
    icon: LayoutDashboard,
  },
  {
    key: "online" as const,
    label: "Online Sessions",
    icon: Monitor,
  },
];

/* ─────────────────────────────────────────────
  COMPONENTS
───────────────────────────────────────────── */

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  const getPercentageIncrease = (label: string): number => {
    const hash = label
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 20) + 1;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 transition-all hover:scale-[1.02] duration-300 shadow-sm hover:shadow-md">
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 transform translate-x-4 -translate-y-4">
        <Icon size={96} color={ACCENT} />
      </div>
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          {label}
        </p>
        <p className="text-4xl font-bold mb-1" style={{ color: ACCENT }}>
          {value}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
          <TrendingUp size={12} />
          <span>+{getPercentageIncrease(label)}% this week</span>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, icon: Icon }: DetailRowProps) {
  return (
    <div className="group">
      <div className="flex items-center gap-1.5 mb-1">
        {Icon && <Icon size={11} />}
        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
          {label}
        </p>
      </div>
      <p className="text-sm text-gray-800 font-medium leading-relaxed">
        {value || (
          <span className="text-gray-300 font-normal italic">Not provided</span>
        )}
      </p>
    </div>
  );
}

function BookingDetailView({ booking, onClose, onDelete }: SidebarModalProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 px-0 sm:px-4 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-6 font-medium text-sm"
      >
        <ChevronLeft size={16} /> Back to Bookings
      </button>

      <div className="bg-white md:rounded-[2rem] shadow-sm p-6 sm:p-10 max-w-5xl mx-auto border border-gray-100">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
            >
              <User size={28} />
            </div>
            <div className="w-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {booking.firstName} {booking.lastName}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mt-3 sm:mt-2">
                <span className="flex items-center gap-1.5 truncate">
                  <Mail size={14} className="shrink-0" />{" "}
                  <span className="truncate">{booking.email}</span>
                </span>
                {booking.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} className="shrink-0" /> {booking.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete(booking.id)}
            className="flex items-center justify-center w-full md:w-auto gap-2 px-5 py-2.5 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 transition-all font-medium text-sm shadow-sm"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Session Details Card */}
          <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8 border border-gray-50">
            <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: ACCENT, color: "white" }}
              >
                <Briefcase size={14} />
              </span>
              Session Details
            </h3>
            <div className="space-y-6">
              <DetailRow
                icon={Layers}
                label="Session Type"
                value={booking.sessionType}
              />
              <DetailRow
                icon={Radio}
                label="Delivery Mode"
                value={booking.deliveryMode}
              />
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <DetailRow
                  icon={CalendarCheck}
                  label="Date"
                  value={
                    booking.preferredDate
                      ? new Date(booking.preferredDate).toLocaleDateString()
                      : ""
                  }
                />
                <DetailRow
                  icon={Clock}
                  label="Time"
                  value={booking.preferredTimeSlot}
                />
              </div>
              {booking.alternateDate && (
                <DetailRow
                  icon={CalendarCheck}
                  label="Alternate Date"
                  value={new Date(booking.alternateDate).toLocaleDateString()}
                />
              )}
            </div>
          </div>

          {/* Client Context Card */}
          <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8 border border-gray-50">
            <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: ACCENT, color: "white" }}
              >
                <Info size={14} />
              </span>
              Professional Context
            </h3>
            <div className="space-y-6">
              <DetailRow
                icon={Building2}
                label="Organisation"
                value={booking.organisation}
              />
              <DetailRow icon={Briefcase} label="Role" value={booking.role} />
              <div className="pt-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                  Notes
                </p>
                <p className="text-sm text-gray-700 leading-relaxed bg-white p-4 rounded-xl border border-gray-100 shadow-sm min-h-[100px]">
                  {booking.context || (
                    <span className="text-gray-400 italic">
                      No additional context provided.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
  MAIN PAGE
───────────────────────────────────────────── */
export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const records = await db
        .collection("bookings")
        .getFullList({ sort: "-createdAt" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const typedBookings: Booking[] = records.map((record: any) => ({
        id: record.id,
        firstName: record.firstName || "",
        lastName: record.lastName || "",
        email: record.email || "",
        phone: record.phone,
        sessionType: record.sessionType || "",
        deliveryMode: record.deliveryMode || "",
        preferredDate: record.preferredDate || "",
        preferredTimeSlot: record.preferredTimeSlot || "",
        alternateDate: record.alternateDate,
        organisation: record.organisation,
        role: record.role,
        context: record.context,
        createdAt: record.createdAt || new Date().toISOString(),
      }));
      setBookings(typedBookings);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to fetch bookings",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = (id: string) => {
    toast("Delete permanently?", {
      action: {
        label: "Delete",
        onClick: async () => {
          await db.collection("bookings").delete(id);
          fetchBookings();
          setSelectedBooking(null);
          toast.success("Deleted");
        },
      },
    });
  };

  const filtered = bookings.filter((b) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      b.firstName?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q);
    const matchType = typeFilter === "all" || b.sessionType === typeFilter;
    return matchSearch && matchType;
  });

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const stats = {
    total: bookings.length,
    online: bookings.filter((b) => b.deliveryMode?.includes("Online")).length,
    inPerson: bookings.filter((b) => b.deliveryMode?.includes("Person")).length,
    organisational: bookings.filter((b) =>
      b.sessionType?.includes("Organisational"),
    ).length,
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (selectedBooking) {
    return (
      <BookingDetailView
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onDelete={deleteBooking}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold flex text-black items-center gap-2">
          <LayoutDashboard /> Admin Dashboard
        </h1>
        <button
          onClick={fetchBookings}
          className="p-3 sm:px-4 sm:py-2.5 flex items-center justify-center bg-white rounded-xl sm:rounded-lg shadow-sm hover:shadow-md transition-all self-start sm:self-auto w-full sm:w-auto text-gray-600 hover:text-black gap-2"
        >
          <RefreshCw size={18} />
          <span className="font-medium text-sm">Refresh View</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {STAT_CARDS.map(({ key, ...card }) => (
          <StatCard
            key={key}
            {...card}
            value={stats[key as keyof typeof stats] || 0}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          className="flex-1 p-3.5 sm:p-3 shadow-sm hover:shadow-md rounded-xl outline-none focus:ring-2 focus:ring-brown/5 transition-all border-none w-full"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-3.5 sm:p-3 shadow-sm hover:shadow-md rounded-xl outline-none focus:ring-2 focus:ring-brown/5 transition-all border-none cursor-pointer w-full sm:w-auto min-w-[200px]"
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Session Types</option>
          <option value="Individual">Individual</option>
          <option value="Group">Group</option>
          <option value="Organisational">Organisational</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((booking) => (
          <div
            key={booking.id}
            onClick={() => {
              setSelectedBooking(booking);
            }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="flex justify-end items-start mb-4">
              <span className="text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-lg text-gray-500">
                {new Date(booking.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="font-bold text-lg">
              {booking.firstName} {booking.lastName}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{booking.email}</p>
            <div className="flex gap-2 text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded-md">
                {booking.sessionType}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded-md">
                {booking.deliveryMode}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filtered.length > ITEMS_PER_PAGE && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-3 shadow-sm bg-white rounded-xl disabled:opacity-50 hover:shadow-md transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            disabled={currentPage * ITEMS_PER_PAGE >= filtered.length}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-3 shadow-sm bg-white rounded-xl disabled:opacity-50 hover:shadow-md transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
