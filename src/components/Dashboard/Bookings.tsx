"use client";

import { db } from "@/backend/server";
import {
  CheckCircle2,
  Clock,
  Calendar,
  User,
  Mail,
  UserCircle,
  Users,
  Building2,
  Monitor,
  MapPin,
  PhoneCall,
  Eye,
  Check,
  X,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageSquare,
  Briefcase,
  Info,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Menu,
  Phone,
  Trash2,
  LayoutDashboard,
  TrendingUp,
  Filter,
  Sparkles,
  Star,
  Heart,
  ArrowRight,
  Radio,
  CalendarCheck,
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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  [key: string]: unknown;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  color: string;
}

interface DetailRowProps {
  label: string;
  value?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface StatusBadgeProps {
  status: Booking["status"];
}

interface SectionProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}

interface SidebarModalProps {
  booking: Booking;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  updating: boolean;
}

/* ─────────────────────────────────────────────
  CONSTANTS
───────────────────────────────────────────── */
const STATUS_OPTIONS = [
  {
    value: "pending" as const,
    label: "Pending",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  {
    value: "confirmed" as const,
    label: "Confirmed",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  {
    value: "completed" as const,
    label: "Completed",
    dot: "bg-slate-400",
    badge: "bg-slate-50 text-slate-600 border-slate-200",
    icon: Check,
  },
  {
    value: "cancelled" as const,
    label: "Cancelled",
    dot: "bg-rose-400",
    badge: "bg-rose-50 text-rose-600 border-rose-200",
    icon: X,
  },
];

const ITEMS_PER_PAGE = 8;
const ACCENT = "#8e9867";

const STAT_CARDS = [
  {
    key: "total" as const,
    label: "Total Bookings",
    icon: LayoutDashboard,
    gradient: "from-mint-50 to-mint-100",
    color: "text-mint-700",
  },
  {
    key: "pending" as const,
    label: "Pending Review",
    icon: Clock,
    gradient: "from-amber-50 to-amber-100",
    color: "text-amber-600",
  },
  {
    key: "confirmed" as const,
    label: "Confirmed",
    icon: CheckCircle2,
    gradient: "from-emerald-50 to-emerald-100",
    color: "text-emerald-600",
  },
  {
    key: "completed" as const,
    label: "Completed",
    icon: Star,
    gradient: "from-slate-50 to-slate-100",
    color: "text-slate-500",
  },
];

/* ─────────────────────────────────────────────
  HELPERS
───────────────────────────────────────────── */
const getSessionIcon = (
  type: string,
): React.ComponentType<{ size?: number; className?: string }> => {
  if (type === "Group") return Users;
  if (type === "Organisational") return Building2;
  return UserCircle;
};

const getDeliveryIcon = (
  mode: string,
): React.ComponentType<{ size?: number; className?: string }> => {
  if (mode?.includes("Online")) return Monitor;
  if (mode?.includes("In Person") || mode?.includes("In-Person")) return MapPin;
  return PhoneCall;
};

const getStatus = (status: Booking["status"]) =>
  STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];

/* ─────────────────────────────────────────────
  STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({ status }: StatusBadgeProps) {
  const s = getStatus(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.badge} shadow-sm`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
      {s.label}
    </span>
  );
}

/* ─────────────────────────────────────────────
  GRADIENT CARD
───────────────────────────────────────────── */
function StatCard({
  label,
  value,
  icon: Icon,
  gradient,
  color,
}: StatCardProps) {
  // Generate a consistent random number based on label to avoid Math.random
  const getPercentageIncrease = (label: string): number => {
    const hash = label
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 20) + 1; // Returns a number between 1 and 20
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 transition-all hover:scale-[1.02] duration-300 shadow-sm hover:shadow-md`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <Icon size={80} className="text-current" />
      </div>
      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          {label}
        </p>
        <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
          <TrendingUp size={12} />
          <span>+{getPercentageIncrease(label)}% this week</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
  DETAIL ROW
───────────────────────────────────────────── */
function DetailRow({ label, value, icon: Icon }: DetailRowProps) {
  return (
    <div className="group">
      <div className="flex items-center gap-1.5 mb-1">
        {Icon && <Icon size={11} className={` text-${ACCENT}`} />}
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

/* ─────────────────────────────────────────────
  SECTION COMPONENT (Moved outside render)
───────────────────────────────────────────── */
function Section({
  icon: Icon,
  title,
  children,
  expanded,
  onToggle,
}: SectionProps) {
  return (
    <div className="rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-300 flex items-center justify-between group"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm"
            style={{ backgroundColor: ACCENT }}
          >
            <Icon size={13} className="text-white" />
          </div>
          <span className="font-semibold text-gray-800 text-sm tracking-wide">
            {title}
          </span>
        </div>
        <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-mint-300 transition-colors">
          {expanded ? (
            <ChevronUp size={12} style={{ color: ACCENT }} />
          ) : (
            <ChevronDown size={12} className="text-gray-400" />
          )}
        </div>
      </button>
      {expanded && (
        <div className="p-4 bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
  SIDEBAR MODAL
───────────────────────────────────────────── */
function SidebarModal({
  booking,
  onClose,
  onUpdateStatus,
  onDelete,
  updating,
}: SidebarModalProps) {
  const [expandedSections, setExpandedSections] = useState({
    booking: true,
    client: true,
    context: true,
    metadata: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Sidebar Panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ease-in-out animate-in slide-in-from-right"
        style={{
          width: "min(480px, 100vw)",
        }}
      >
        {/* Header with gradient */}
        <div className="bg-mint px-6 py-5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-mint-400 to-mint-600 rounded-xl blur opacity-50" />
              <div className="relative w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <User size={20} className="text-gray-500" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-lg leading-tight truncate">
                {booking.firstName} {booking.lastName}
              </p>
              <p className="text-gray-50 text-xs truncate mt-1">
                {booking.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <X size={18} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Status control */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 shrink-0 bg-gray-50">
          <div className="flex items-center gap-2">
            <Sparkles size={14} style={{ color: ACCENT }} />
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Current Status
            </p>
          </div>
          <select
            value={booking.status}
            onChange={(e) => onUpdateStatus(booking.id, e.target.value)}
            disabled={updating}
            className="px-3 py-1.5 text-sm font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-mint-400 cursor-pointer transition-all"
            style={{ borderColor: ACCENT }}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Body — scrollable with collapsible sections */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {/* Session Details Section */}
          <Section
            icon={Briefcase}
            title="Session Details"
            expanded={expandedSections.booking}
            onToggle={() => toggleSection("booking")}
          >
            <div className="grid grid-cols-1 gap-4">
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
              <DetailRow
                icon={CalendarCheck}
                label="Preferred Date"
                value={booking.preferredDate}
              />
              <DetailRow
                icon={Clock}
                label="Time Slot"
                value={booking.preferredTimeSlot}
              />
              {booking.alternateDate && (
                <DetailRow
                  icon={Calendar}
                  label="Alternate Date"
                  value={booking.alternateDate}
                />
              )}
            </div>
          </Section>

          {/* Client Information Section */}
          <Section
            icon={User}
            title="Client Information"
            expanded={expandedSections.client}
            onToggle={() => toggleSection("client")}
          >
            <div className="grid grid-cols-2 gap-4">
              <DetailRow
                icon={User}
                label="First Name"
                value={booking.firstName}
              />
              <DetailRow
                icon={User}
                label="Last Name"
                value={booking.lastName}
              />
              <div className="col-span-2">
                <DetailRow icon={Mail} label="Email" value={booking.email} />
              </div>
              <DetailRow icon={Phone} label="Phone" value={booking.phone} />
              <DetailRow
                icon={Building2}
                label="Organisation"
                value={booking.organisation}
              />
              <div className="col-span-2">
                <DetailRow icon={Briefcase} label="Role" value={booking.role} />
              </div>
            </div>
          </Section>

          {/* Supervision Context Section */}
          <Section
            icon={MessageSquare}
            title="Supervision Context"
            expanded={expandedSections.context}
            onToggle={() => toggleSection("context")}
          >
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {booking.context || (
                  <span className="text-gray-400 italic">
                    No context provided.
                  </span>
                )}
              </p>
            </div>
          </Section>

          {/* Metadata Section */}
          <Section
            icon={Info}
            title="Metadata"
            expanded={expandedSections.metadata}
            onToggle={() => toggleSection("metadata")}
          >
            <div className="space-y-3">
              <DetailRow
                icon={Calendar}
                label="Created At"
                value={new Date(booking.createdAt).toLocaleString()}
              />
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Info size={11} style={{ color: ACCENT }} />
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                    Booking ID
                  </p>
                </div>
                <p className="text-xs font-mono text-gray-500 bg-gray-50 p-2 rounded-lg break-all">
                  {booking.id}
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* Action buttons */}
        <div className="shrink-0 border-t hidden border-gray-100 p-6 space-y-3 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onUpdateStatus(booking.id, "confirmed")}
              disabled={updating || booking.status === "confirmed"}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle2 size={15} /> Confirm
            </button>
            <button
              onClick={() => onUpdateStatus(booking.id, "completed")}
              disabled={updating || booking.status === "completed"}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check size={15} /> Complete
            </button>
          </div>
          <button
            onClick={() => onUpdateStatus(booking.id, "cancelled")}
            disabled={updating || booking.status === "cancelled"}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-rose-200 hover:border-rose-400 text-rose-600 hover:text-rose-700 text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-white"
          >
            <X size={15} /> Cancel Booking
          </button>
          <button
            onClick={() => onDelete(booking.id)}
            disabled={updating}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-sm font-semibold transition-all duration-300 disabled:opacity-40"
          >
            <Trash2 size={15} /> Delete Permanently
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
  MAIN COMPONENT
───────────────────────────────────────────── */
export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [updating, setUpdating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* Responsive */
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Fetch */
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const records = await db
        .collection("bookings")
        .getFullList({ sort: "-createdAt" });

      // Safely cast the records to Booking type with validation
      const typedBookings: Booking[] = records.map((record) => ({
        ide: record.id,
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
        status: (record.status as Booking["status"]) || "pending",
        createdAt: record.createdAt || new Date().toISOString(),
        ...record,
      }));

      setBookings(typedBookings);
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch bookings";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* Update status */
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdating(true);
      await db.collection("bookings").update(id, { status: newStatus });
      await fetchBookings();
      if (selectedBooking?.id === id)
        setSelectedBooking({
          ...selectedBooking,
          status: newStatus as Booking["status"],
        });
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update status";
      setError(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  /* Delete */
  const deleteBooking = (id: string) => {
    toast("Delete this booking permanently?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            setUpdating(true);
            await db.collection("bookings").delete(id);
            await fetchBookings();
            if (selectedBooking?.id === id) {
              setSelectedBooking(null);
              setIsModalOpen(false);
            }
            toast.success("Booking deleted successfully.");
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to delete booking";
            setError(errorMessage);
          } finally {
            setUpdating(false);
          }
        }
      },
      cancel: {
        label: "Cancel",
        onClick: () => {}
      }
    });
  };

  /* Handle booking click */
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
    if (isMobile) setIsMenuOpen(false);
  };

  /* Filter & paginate */
  const filtered = bookings.filter((b) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      b.firstName?.toLowerCase().includes(q) ||
      b.lastName?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q) ||
      b.phone?.toLowerCase().includes(q);
    return matchSearch && (statusFilter === "all" || b.status === statusFilter);
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /* Stats */
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  /* Export CSV */
  const exportToCSV = () => {
    const headers = [
      "Date",
      "Name",
      "Email",
      "Phone",
      "Session Type",
      "Delivery Mode",
      "Preferred Date",
      "Time Slot",
      "Status",
    ];
    const rows = filtered.map((b) => [
      new Date(b.createdAt).toLocaleDateString(),
      `${b.firstName} ${b.lastName}`,
      b.email,
      b.phone || "-",
      b.sessionType,
      b.deliveryMode,
      b.preferredDate,
      b.preferredTimeSlot,
      b.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mint-400 to-mint-600 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={32} className="text-white animate-spin" />
            </div>
          </div>
          <p className="text-gray-500 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-['Inter',system-ui]">
      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-mint-400 to-mint-600 rounded-xl blur opacity-50" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-700 flex items-center justify-center shadow-lg">
              <LayoutDashboard size={18} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">
              Ethos Admin
            </h1>
            <p className="text-gray-400 text-xs hidden sm:block">
              Booking Management Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchBookings}
            className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
            title="Refresh"
          >
            <RefreshCw
              size={18}
              className="text-gray-500 group-hover:text-mint-500 transition-colors"
            />
          </button>
          <button
            onClick={exportToCSV}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Download size={15} /> Export CSV
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          >
            <Menu size={18} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobile && isMenuOpen && (
        <div className="fixed top-[65px] right-4 z-30 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 animate-in slide-in-from-top-2 duration-200 min-w-[180px]">
          <button
            onClick={() => {
              exportToCSV();
              setIsMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            <Download size={16} className="text-mint-500" />
            Export CSV
          </button>
        </div>
      )}

      {/* ── BODY ── */}
      <div className="flex-1 overflow-y-auto py-6 sm:py-8 px-4 sm:px-8">
        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-white border border-rose-200 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
              <AlertCircle size={16} className="text-rose-500" />
            </div>
            <p className="text-rose-600 text-sm flex-1">{error}</p>
            <button
              onClick={() => setError("")}
              className="text-rose-400 hover:text-rose-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {STAT_CARDS.map(({ key, label, icon, gradient, color }) => (
            <StatCard
              key={key}
              label={label}
              value={stats[key]}
              icon={icon}
              gradient={gradient}
              color={color}
            />
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent bg-gray-50 transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mint-400 transition-all"
              >
                <option value="all">All Status</option>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Booking list */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Desktop header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <div className="col-span-2">Received</div>
            <div className="col-span-3">Client</div>
            <div className="col-span-3">Session</div>
            <div className="col-span-2">Preferred Date</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-50">
            {paginated.length === 0 ? (
              <div className="py-16 sm:py-20 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Heart size={28} className="text-gray-300" />
                </div>
                <div>
                  <p className="text-gray-500 font-medium">No bookings found</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              </div>
            ) : (
              paginated.map((booking) => {
                const SessionIcon = getSessionIcon(booking.sessionType);
                const DeliveryIcon = getDeliveryIcon(booking.deliveryMode);

                return (
                  <div
                    key={booking.id}
                    onClick={() => handleBookingClick(booking)}
                    className="group cursor-pointer transition-all duration-300 px-4 sm:px-6 py-4 hover:bg-gray-50"
                  >
                    {/* Mobile layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {booking.firstName} {booking.lastName}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {booking.email}
                          </p>
                        </div>
                        <StatusBadge status={booking.status} />
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                          <Calendar size={11} className="text-mint-400" />
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                          <SessionIcon size={11} className="text-mint-400" />
                          {booking.sessionType}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                          <Clock size={11} className="text-mint-400" />
                          {booking.preferredDate}
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <button className="text-mint-500 text-xs font-medium flex items-center gap-1">
                          View Details <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mint-100 to-mint-200 flex items-center justify-center">
                            <Calendar size={12} className="text-mint-600" />
                          </div>
                          <span className="text-sm text-gray-600">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <p className="font-semibold text-gray-800 text-sm leading-none">
                          {booking.firstName} {booking.lastName}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {booking.email}
                        </p>
                      </div>
                      <div className="col-span-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                            <SessionIcon size={11} className="text-mint-500" />
                            {booking.sessionType}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                            <DeliveryIcon size={11} className="text-mint-500" />
                            {booking.deliveryMode}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-700 font-medium">
                          {booking.preferredDate}
                        </p>
                        <p className="text-xs text-gray-400">
                          {booking.preferredTimeSlot}
                        </p>
                      </div>
                      <div className="col-span-1">
                        <StatusBadge status={booking.status} />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookingClick(booking);
                          }}
                          className="p-2 rounded-lg text-gray-400 hover:text-mint-500 hover:bg-mint-50 transition-all duration-300"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-500 order-2 sm:order-1">
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-700">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                  {filtered.length}
                </span>{" "}
                bookings
              </p>
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-white hover:border-mint-300 transition-all duration-300"
                >
                  <ChevronLeft size={15} className="text-gray-600" />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = currentPage;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2)
                      pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;

                    if (pageNum > totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-mint-500 text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-white hover:border-mint-300 transition-all duration-300"
                >
                  <ChevronRight size={15} className="text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Modal */}
      {isModalOpen && selectedBooking && (
        <SidebarModal
          booking={selectedBooking}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBooking(null);
          }}
          onUpdateStatus={updateStatus}
          onDelete={deleteBooking}
          updating={updating}
        />
      )}
    </div>
  );
}
