"use client";

import { useAuth } from "../../AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { sendPasswordResetEmail, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { auth, firebaseConfig } from "../../firebase";

export default function SettingsPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const [resetEmail, setResetEmail] = useState<string>("");
  const [resetStatus, setResetStatus] = useState<{ type: "idle" | "success" | "error" | "loading"; message?: string }>({ type: "idle" });

  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [newUserStatus, setNewUserStatus] = useState<{ type: "idle" | "success" | "error" | "loading"; message?: string }>({ type: "idle" });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = resetEmail || user?.email || "";
    if (!targetEmail) {
      setResetStatus({ type: "error", message: "Please enter an email to send a reset link." });
      return;
    }
    setResetStatus({ type: "loading" });
    try {
      await sendPasswordResetEmail(auth, targetEmail);
      setResetStatus({ type: "success", message: `Reset link sent to ${targetEmail}.` });
    } catch (err: any) {
      setResetStatus({ type: "error", message: err?.message || "Failed to send reset email." });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserPassword) {
      setNewUserStatus({ type: "error", message: "Email and password are required." });
      return;
    }
    setNewUserStatus({ type: "loading" });
    try {
      const secondaryApp = getApps().find((app) => app.name === "secondary") || initializeApp(firebaseConfig, "secondary");
      const secondaryAuth = getAuth(secondaryApp);
      await createUserWithEmailAndPassword(secondaryAuth, newUserEmail, newUserPassword);
      setNewUserStatus({ type: "success", message: `User ${newUserEmail} created.` });
      setNewUserEmail("");
      setNewUserPassword("");
    } catch (err: any) {
      setNewUserStatus({ type: "error", message: err?.message || "Failed to create user." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1">
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-light text-slate-800 tracking-wide">Settings</h1>
                <p className="text-sm text-slate-600 font-light">Account and application settings</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/70">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Reset Password</h2>
                  <p className="text-sm text-slate-600">Send a reset link to your email.</p>
                </div>
              </div>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    value={resetEmail || user?.email || ""}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={user?.email || "you@example.com"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={resetStatus.type === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {resetStatus.type === "loading" ? "Sending..." : "Send reset link"}
                </button>
                {resetStatus.type === "success" && (
                  <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    {resetStatus.message}
                  </p>
                )}
                {resetStatus.type === "error" && (
                  <p className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {resetStatus.message}
                  </p>
                )}
              </form>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/70">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Create New User</h2>
                  <p className="text-sm text-slate-600">Invite a teammate with email and password.</p>
                </div>
              </div>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="teammate@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <input
                    type="password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Minimum 6 characters"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newUserStatus.type === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {newUserStatus.type === "loading" ? "Creating..." : "Create user"}
                </button>
                {newUserStatus.type === "success" && (
                  <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    {newUserStatus.message}
                  </p>
                )}
                {newUserStatus.type === "error" && (
                  <p className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {newUserStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
