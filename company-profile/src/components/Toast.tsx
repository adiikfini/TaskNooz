"use client";

import React from "react";

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  details?: string;
};

export default function Toast({ toast, onClose }: { toast: ToastItem; onClose: (id: string) => void }) {
  React.useEffect(() => {
    const t = setTimeout(() => onClose(toast.id), 6000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  const color = toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-sky-600";

  return (
    <div className={`max-w-sm w-full ${color} text-white shadow-lg rounded-md overflow-hidden`}>
      <div className="px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            <div className="text-sm">{toast.message}</div>
            {toast.details && <div className="mt-1 text-xs opacity-90">{toast.details}</div>}
          </div>
          <button onClick={() => onClose(toast.id)} className="ml-2 text-white/90 hover:text-white">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
