"use client";

export default function SessionActions({ session, onView }: { session: any; onView?: (s: any) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onView && onView(session)} className="px-3 py-1 border rounded text-sm text-slate-700 hover:bg-slate-50">View</button>
    </div>
  );
}
