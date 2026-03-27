"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Create from "./Create";
import Bookings from "./Bookings";
import Reservations from "./Reservations";

export default function Dashboard() {
  const [active, setActive] = useState("posts");

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
    <section className="flex fixed w-full h-screen inset-0 bg-white z-60">
      {/* ✅ Pass the function as a prop */}
      <div>
        <Sidebar onPageChange={handlePageChange} activePage={active} />/
      </div>
      <div className=" w-full h-full ml-55 xl:ml-66 overflow-y-scroll">
        {/* <p className="p-6 text-black font-bold text-5xl">{active}</p> */}
        {renderActivePage()}
      </div>
    </section>
  );
}
