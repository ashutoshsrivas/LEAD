"use client";
import { Fragment } from "react";

export default function SimpleModal({ open, onClose, title, message, okLabel = "OK", actionLabel, onAction }: { open: boolean; onClose: () => void; title?: string; message: string | React.ReactNode; okLabel?: string; actionLabel?: string; onAction?: (() => void) | undefined }) {
  if (!open) return <></>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full mx-4 md:mx-0">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-slate-800">{title || "Notice"}</h3>
        </div>
        <div className="p-4">
          <div className="text-sm text-slate-700 whitespace-pre-wrap">{message}</div>
        </div>
        <div className="p-4 border-t flex justify-end gap-3">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="px-4 py-2 bg-white border rounded-md text-slate-800 hover:bg-slate-50"
            >
              {actionLabel}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {okLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
