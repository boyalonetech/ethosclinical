"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Create from "./Create";
import Bookings from "./Bookings";
import Reservations from "./Reservations";
import { Menu, X } from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [active, setActive] = useState("posts");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ This function updates the parent state
  const handlePageChange = (page: string) => {
    setActive(page);
  };

  const renderActivePage = () => {
    switch (active) {
      case "posts":
        return <Create />;
      case "bookings":
        return <Bookings />;
      case "reservations":
        return <Reservations />;
      default:
        return <Create />;
    }
  };

  return (
    <section className="flex fixed w-full h-screen inset-0 bg-stone-50 z-50">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 right-4 z-70 p-2.5 bg-white rounded-xl shadow-md border border-stone-100 text-stone-700 active:scale-95 transition"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-55"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-60 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onPageChange={(page) => { handlePageChange(page); setIsSidebarOpen(false); }} activePage={active} onLogout={onLogout} />
      </div>

      <div className="w-full h-full overflow-y-auto bg-stone-50 flex-1 relative flex flex-col">
        {renderActivePage()}
      </div>
    </section>
  );
}
