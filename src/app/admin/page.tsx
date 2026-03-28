"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import React, { useState } from "react";
import { checkAdminCredentials } from "./actions";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  React.useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    }
    setIsInitializing(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await checkAdminCredentials(username, password);

    if (res.success) {
      localStorage.setItem("isAdminLoggedIn", "true");
      setIsAuthenticated(true);
    } else {
      setError(res.error || "Invalid credentials");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  if (isInitializing) {
    return null; // Or a loading spinner
  }

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="flex bg-stone-50 min-h-screen items-center fixed w-full inset-0 z-60 justify-center p-6">
      <div className="bg-white max-w-sm w-full p-8 rounded-2xl shadow-sm border border-stone-200">
        <h1 className="text-2xl font-bold text-stone-900 mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-stone-300 focus:outline-[#8E9867] py-2.5 px-3 rounded-lg text-stone-900 text-[15px] bg-[#fcfbf9]"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stone-300 focus:outline-[#8E9867] py-2.5 px-3 rounded-lg text-stone-900 text-[15px] bg-[#fcfbf9]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#8E9867] hover:bg-[#8D6959] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
