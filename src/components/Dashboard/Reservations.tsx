
"use client";

import { useState, useEffect } from "react";
import { db } from "@/backend/server";
import { CheckCircle2, User, Mail, Check, X, Phone, Ticket, Trash2, LayoutDashboard, RefreshCw, Search } from "lucide-react";

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

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const records = await db.collection("reservations").getFullList({ sort: "-created" });
      setReservations(records.map(r => ({
        id: r.id,
        fullName: r.fullName,
        email: r.email,
        phone: r.phone,
        tickets: r.tickets,
        needsChildcare: r.needsChildcare,
        status: r.status,
        ticketId: r.ticketId,
        createdAt: r.created,
      })) as Reservation[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const confirmReservation = async (res: Reservation) => {
    if (!confirm("Confirm and send digital ticket?")) return;
    try {
      setUpdating(true);
      // Wait, we need to call the API rather than DB directly to send the email
      const req = await fetch("/api/reservations/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: res.id,
          fullName: res.fullName,
          email: res.email,
          tickets: res.tickets,
          needsChildcare: res.needsChildcare
        }),
      });
      if (!req.ok) throw new Error("API Failed");
      await fetchReservations();
      alert("Ticket sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Error confirming reservation");
    } finally {
      setUpdating(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      setUpdating(true);
      await db.collection("reservations").update(id, { status });
      await fetchReservations();
    } catch(err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Permanently delete?")) return;
    try {
      setUpdating(true);
      await db.collection("reservations").delete(id);
      await fetchReservations();
    } catch(err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-8">Loading reservations...</div>;

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Reservations</h2>
        <button onClick={fetchReservations} className="bg-gray-100 p-2 rounded hover:bg-gray-200">
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Name / Contact</th>
              <th className="px-6 py-4">Tickets</th>
              <th className="px-6 py-4">Childcare</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{res.fullName}</div>
                  <div className="text-xs">{res.email}</div>
                  <div className="text-xs">{res.phone}</div>
                </td>
                <td className="px-6 py-4 font-bold">{res.tickets}</td>
                <td className="px-6 py-4">{res.needsChildcare ? "Yes" : "No"}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    res.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    res.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {res.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {res.status === 'pending' && (
                    <button 
                      onClick={() => confirmReservation(res)}
                      disabled={updating}
                      className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded text-xs font-medium"
                    >
                      Confirm Event Ticket
                    </button>
                  )}
                  {res.status !== 'cancelled' && (
                    <button 
                      onClick={() => updateStatus(res.id, 'cancelled')}
                      disabled={updating}
                      className="text-red-600 border border-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-xs"
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    onClick={() => deleteReservation(res.id)}
                    disabled={updating}
                    className="text-gray-500 hover:bg-gray-100 p-1.5 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
