"use client";

import React from "react";

// Terima 'isMobile' untuk styling

// Simple client-side logout helper (calls your API route and reloads)
const deleteSession = async () => {
  try {
    await fetch("/api/session", { method: "DELETE" });
    // reload to reflect logged-out state
    if (typeof window !== "undefined") window.location.reload();
  } catch (err) {
    console.error("Failed to delete session", err);
  }
};

export default function LogoutButton({ isMobile = false, onClick = () => {} }) {
  
  const handleLogout = () => {
    onClick(); // Tutup menu mobile jika ada
    deleteSession(); // Panggil Server Action
  };

  if (isMobile) {
    return (
      <button 
        onClick={handleLogout}
        className="mt-4 w-full rounded-lg bg-gray-700 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-gray-600"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button 
      onClick={handleLogout}
      className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-gray-600"
    >
      Sign Out
    </button>
  );
}