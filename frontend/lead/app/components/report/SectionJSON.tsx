"use client";
import { useState } from "react";

export default function SectionJSON({ json }: { json: any }) {
  const [show, setShow] = useState(false);

  return (
    <section className="mt-10">
      <button
        className="px-4 py-2 bg-gray-200 rounded border"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide Raw JSON" : "Show Raw JSON"}
      </button>

      {show && (
        <pre className="mt-4 text-xs bg-gray-50 p-4 rounded overflow-auto whitespace-pre-wrap">
          {JSON.stringify(json, null, 2)}
        </pre>
      )}
    </section>
  );
}
