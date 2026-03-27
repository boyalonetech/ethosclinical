"use client";

import React from "react";

interface SidebarProps {
  onPageChange: (page: string) => void;
  activePage: string;
}

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "posts", label: "Posts" },
  { id: "bookings", label: "Bookings" },
  { id: "reservations", label: "Reservations" },
];

export default function Sidebar({ onPageChange, activePage }: SidebarProps) {
  return (
    <aside className="w-55 xl:w-66 h-screen fixed left-0 border-r shadow-lg bg-white">
      <h1 className="text-left text-black font-bold text-4xl p-6 border-b">
        Admin
      </h1>

      <nav className="flex flex-col gap-2 p-4">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            className={`p-3 px-6 rounded-lg text-left transition-all duration-200 ${
              activePage === id
                ? "bg-mint text-white shadow-md"
                : "bg-white/50 text-mint hover:bg-white hover:shadow-sm border border-mint/20"
            }`}
            onClick={() => onPageChange(id)}
          >
            {label}
          </button>
        ))}

        <button className="p-3 px-6 rounded-lg text-left text-red-500 hover:bg-red-50 transition-all duration-200 mt-4 border border-red-200">
          Logout
        </button>
      </nav>
    </aside>
  );
}