"use client";
import React from "react";

interface SidebarProps {
  onPageChange: (page: string) => void; // ✅ Function to call parent
  activePage: string; // ✅ Current active page from parent
}

export default function Sidebar({ onPageChange, activePage }: SidebarProps) {
  // ❌ Remove this - don't manage local state
  // const [nav, setNav] = useState("posts");

  // ❌ Remove this - don't reassign props
  // mode = "bookings"

  return (
    <aside className="w-66 h-screen fixed left-0 border bg-mint">
      <h1 className="text-left font-bold text-4xl p-4">Admin</h1>

      <div className="flex flex-col gap-4">
        <button
          className={`p-3 px-6 mx-2 transition-colors ${
            activePage === "posts"
              ? "bg-white text-mint"
              : "bg-white/50 text-mint hover:bg-white"
          }`}
          onClick={() => onPageChange("posts")} // ✅ Call parent function
        >
          Posts
        </button>
        <button
          className={`p-3 px-6 mx-2 transition-colors ${
            activePage === "bookings"
              ? "bg-white text-mint"
              : "bg-white/50 text-mint hover:bg-white"
          }`}
          onClick={() => onPageChange("bookings")} // ✅ Call parent function
        >
          Bookings
        </button>
        <button className="p-3 px-6 bg-white mx-2 text-mint">Logout</button>
      </div>
    </aside>
  );
}
