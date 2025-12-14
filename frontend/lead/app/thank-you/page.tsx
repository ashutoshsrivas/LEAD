export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-50 flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 text-center shadow-lg">
        <h1 className="text-3xl font-semibold text-slate-800">Thank you!</h1>
        <p className="mt-4 text-slate-700">We have received your responses. Your input helps us improve.</p>
        <div className="mt-6">
          <a href="/" className="inline-block px-4 py-2 bg-sky-600 text-white rounded-md">Return to home</a>
        </div>
      </div>
    </div>
  );
}
