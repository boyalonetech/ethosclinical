"use client";

import { useState, useEffect } from "react";
import { db } from "@/backend/server";
import {
  CheckCircle2,
  Trash2,
  RefreshCw,
  X,
  Loader2,
  Phone,
  Mail,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Reservation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  tickets: string | number;
  needsChildcare: boolean;
  status: "pending" | "confirmed" | "cancelled";
  ticketId?: string;
  createdAt: string;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const records = await db
        .collection("reservations")
        .getFullList({ sort: "-created" });
      setReservations(
        records.map((r) => ({
          id: r.id,
          fullName: r.fullName,
          email: r.email,
          phone: r.phone,
          tickets: r.tickets,
          needsChildcare: r.needsChildcare,
          status: r.status,
          ticketId: r.ticketId,
          createdAt: r.created,
        })) as Reservation[],
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const confirmReservation = (res: Reservation) => {
    setConfirmAction({
      title: "Confirm & Dispatch Ticket?",
      message: `Are you sure you want to approve ${res.fullName}? An official digital ticket will be instantly generated and emailed to them.`,
      onConfirm: async () => {
        try {
          setUpdating(true);
          const req = await fetch("/api/reservations/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: res.id,
              fullName: res.fullName,
              email: res.email,
              tickets: res.tickets,
              needsChildcare: res.needsChildcare,
            }),
          });
          if (!req.ok) throw new Error("API Failed");
          await fetchReservations();
          toast.success(`Ticket dispatched to ${res.email}!`);
        } catch (err) {
          console.error(err);
          toast.error("Error confirming reservation.");
        } finally {
          setUpdating(false);
        }
      },
    });
  };

  const cancelReservation = async (res: Reservation) => {
    setConfirmAction({
      title: "Cancel Reservation?",
      message: `Are you sure you want to cancel the reservation for ${res.fullName}? They will receive an email notification indicating cancellation.`,
      onConfirm: async () => {
        try {
          setUpdating(true);
          const req = await fetch("/api/reservations/cancel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: res.id,
              fullName: res.fullName,
              email: res.email,
            }),
          });
          if (!req.ok) throw new Error("API Failed");
          await fetchReservations();
          toast.success("Reservation cancelled & email sent.");
        } catch (err) {
          console.error(err);
          toast.error("Failed to cancel reservation.");
        } finally {
          setUpdating(false);
        }
      },
    });
  };

  const deleteReservation = (id: string) => {
    setConfirmAction({
      title: "Permanently Delete?",
      message:
        "Are you sure you want to permanently delete this reservation? This cannot be undone.",
      onConfirm: async () => {
        try {
          setUpdating(true);
          await db.collection("reservations").delete(id);
          await fetchReservations();
          toast.success("Reservation deleted.");
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete reservation.");
        } finally {
          setUpdating(false);
        }
      },
    });
  };

  if (loading)
    return (
      <div className="p-4 md:p-8 flex items-center justify-center flex-col min-h-[500px] w-full">
        <Loader2 className="animate-spin text-stone-400 mb-4" size={32} />
        <p className="text-stone-500 font-medium tracking-wide animate-pulse">
          Loading reservations...
        </p>
      </div>
    );

  return (
    <div className="w-full h-full relative p-4 md:p-8 lg:p-12 overflow-y-auto bg-stone-50/30">
      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-stone-100"
            >
              <div className="p-6">
                <h3 className="text-[19px] font-bold text-stone-900 mb-2 tracking-tight">
                  {confirmAction.title}
                </h3>
                <p className="text-stone-500 text-[15px] leading-relaxed">
                  {confirmAction.message}
                </p>
              </div>
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-end gap-3 rounded-b-2xl">
                <button
                  onClick={() => setConfirmAction(null)}
                  disabled={updating}
                  className="px-5 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-200 rounded-xl transition active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmAction
                      .onConfirm()
                      .finally(() => setConfirmAction(null));
                  }}
                  disabled={updating}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition flex items-center gap-2 active:scale-95 disabled:opacity-70 shadow-md shadow-stone-900/20"
                >
                  {updating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight">
            Event Reservations
          </h2>
          <p className="text-stone-500 mt-2 font-medium">
            Manage pending event tickets and digital dispatches
          </p>
        </div>
        <button
          onClick={fetchReservations}
          disabled={updating}
          className="self-start md:self-auto flex items-center gap-2 bg-white border border-stone-200 text-stone-600 px-4 py-2.5 rounded-xl hover:bg-stone-50 hover:border-stone-300 transition shadow-sm active:scale-95"
        >
          <RefreshCw size={18} className={updating ? "animate-spin" : ""} />
          <span className="font-semibold text-sm">Refresh List</span>
        </button>
      </div>

      {/* Responsive Grid/List */}
      {reservations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200/60 p-16 flex flex-col items-center justify-center shadow-sm">
          <Ticket size={48} className="text-stone-300 mb-4" strokeWidth={1} />
          <h3 className="text-xl font-bold text-stone-800 mb-2">
            No Reservations Yet
          </h3>
          <p className="text-stone-500 max-w-sm text-center">
            When clients book tickets, their pending requests will elegantly
            appear right here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-stone-300 transition-all overflow-hidden flex flex-col group relative"
            >
              {/* Status Header Bar */}
              <div className="px-6 py-4 flex justify-between items-center border-b border-stone-100 bg-stone-50/50">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold shadow-sm flex items-center gap-1.5 ${
                    res.status === "confirmed"
                      ? "bg-green-100 text-green-700 border border-green-200/60"
                      : res.status === "pending"
                        ? "bg-amber-100 text-amber-700 border border-amber-200/60"
                        : "bg-rose-100 text-rose-700 border border-rose-200/60"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      res.status === "confirmed"
                        ? "bg-green-600"
                        : res.status === "pending"
                          ? "bg-amber-500 animate-pulse"
                          : "bg-rose-600"
                    }`}
                  ></div>
                  {res.status}
                </span>

                <span className="text-xs text-stone-400 font-medium">
                  #{res.id.substring(0, 6)}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-grow flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#8c9c74] transition-colors">
                    {res.fullName}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-stone-600 text-[14px]">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex justify-center items-center text-stone-500 flex-shrink-0">
                      <Mail size={14} />
                    </div>
                    <span className="truncate">{res.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600 text-[14px]">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex justify-center items-center text-stone-500 flex-shrink-0">
                      <Phone size={14} />
                    </div>
                    <span>{res.phone || "No phone provided"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100 text-center flex flex-col justify-center">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                      Tickets
                    </span>
                    <span className="block font-bold text-stone-800 text-[17px]">
                      {res.tickets}
                    </span>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100 text-center flex flex-col justify-center">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                      Childcare
                    </span>
                    <span className="block font-bold text-stone-800 text-[17px]">
                      {res.needsChildcare ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="bg-green-50/40 rounded-xl p-2.5 border border-green-100/60 text-center flex flex-col justify-center">
                    <span className="block text-[10px] font-bold text-green-600/70 uppercase tracking-wider mb-0.5">
                      Expected
                    </span>
                    <span className="block font-bold text-green-700 text-[17px]">
                      ${Number(res.tickets) * 400}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-stone-50/80 border-t border-stone-100 flex justify-end gap-2 items-center">
                {res.status === "pending" && (
                  <button
                    onClick={() => confirmReservation(res)}
                    disabled={updating}
                    className="flex-grow flex justify-center items-center gap-2 text-white bg-[#8c9c74] hover:bg-[#7a8863] py-2.5 rounded-xl text-[14px] font-semibold tracking-wide shadow-sm shadow-[#8c9c74]/20 transition active:scale-95 disabled:opacity-60"
                  >
                    <CheckCircle2 size={16} /> Approve & Send
                  </button>
                )}
                {res.status !== "cancelled" && (
                  <button
                    onClick={() => cancelReservation(res)}
                    disabled={updating}
                    title="Reject/Cancel"
                    className={`p-2.5 rounded-xl text-stone-500 border border-stone-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition active:scale-95 disabled:opacity-50 ${res.status !== "pending" && "flex-grow flex justify-center items-center gap-2"}`}
                  >
                    <X size={18} />{" "}
                    {res.status !== "pending" && (
                      <span className="text-sm font-semibold">
                        Cancel Ticket
                      </span>
                    )}
                  </button>
                )}
                <button
                  onClick={() => deleteReservation(res.id)}
                  disabled={updating}
                  title="Permanently Delete"
                  className="p-2.5 rounded-xl text-stone-400 border border-stone-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition active:scale-95 disabled:opacity-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Global Processing SnackBar */}
      <AnimatePresence>
        {updating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-stone-900 border border-stone-800 text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex items-center gap-3 z-50"
          >
            <Loader2 className="animate-spin text-stone-400" size={20} />
            <span className="text-[14px] font-semibold tracking-wide">
              Processing...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
