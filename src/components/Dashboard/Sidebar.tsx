"use client";

import React from "react";
import { FileText, CalendarCheck, CalendarDays, LogOut, Shield } from "lucide-react";

interface SidebarProps {
  onPageChange: (page: string) => void;
  activePage: string;
  onLogout: () => void;
}

const NAV_ITEMS = [
  { id: "posts", label: "Posts", icon: FileText },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "reservations", label: "Reservations", icon: CalendarDays },
];

export default function Sidebar({ onPageChange, activePage, onLogout }: SidebarProps) {
  return (
    <aside className="w-[280px] h-full border-r border-gray-300 bg-white flex flex-col">
      {/* Brand area */}
      <div className="p-6 md:p-8 flex items-center gap-3 border-b border-gray-50">
        <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center text-mint">
          <Shield size={20} />
        </div>
        <div>
          <h1 className="text-gray-900 font-bold text-xl tracking-tight leading-none">
            Ethos
          </h1>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">
            Workspace
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-2 p-4 md:p-6 pb-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2">
          Overview
        </p>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-mint text-white shadow-md shadow-mint/20"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => onPageChange(id)}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 md:p-6 border-t border-gray-50 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          Logout
        </button>
      </div>
    </aside>
  );
}