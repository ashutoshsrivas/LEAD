"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "../lib/api";

export default function PublicFormClient({ session, questions, token }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedSession, setLoadedSession] = useState<any>(session ?? null);
  const [loadedQuestions, setLoadedQuestions] = useState<any[]>(questions ?? []);
  const [lastFetchInfo, setLastFetchInfo] = useState<any>(null);
  const [lastFetchBody, setLastFetchBody] = useState<string | null>(null);
  const sess = loadedSession;
  const qs = loadedQuestions;
  // resolve token: prefer prop, fallback to URL path (client-side)
  const resolvedToken = token ?? (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : undefined);
  // if token provided and session not loaded, fetch session+questions client-side

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (sess) return;
      setLoading(true);
      try {
        // determine token to use
        const t = resolvedToken;
        if (!t) {
          setLastFetchInfo({ url: 'no-token', error: 'No token available (prop or URL)' });
          setLoadedSession(null);
        } else {
          // try link token first
          let sres = null;
          try {
            const url = `${API_BASE}/sessions/link/${t}`;
            sres = await fetch(url);
            setLastFetchInfo({ url, status: sres.status, ok: sres.ok, usedToken: t });
          } catch (fe) {
            setLastFetchInfo({ url: `${API_BASE}/sessions/link/${t}`, error: String(fe), usedToken: t });
          }

          if (!sres || !sres.ok) {
            // fallback to session id
            try {
              const url = `${API_BASE}/sessions/${t}`;
              const fres = await fetch(url);
              sres = fres;
              setLastFetchInfo({ url, status: fres.status, ok: fres.ok, usedToken: t });
            } catch (fe) {
              setLastFetchInfo({ url: `${API_BASE}/sessions/${t}`, error: String(fe), usedToken: t });
            }
          }

          if (!sres || !sres.ok) {
            // session not found — continue without session (public flow)
            setLoadedSession(null);
            try {
              const txt = sres ? await sres.text() : null;
              setLastFetchBody(txt);
            } catch (e) {
              setLastFetchBody(null);
            }
          } else {
            // safe parse session body
            const stext = await sres.text();
            setLastFetchBody(stext);
            if (!stext) {
              // empty body — treat as missing session
              setLoadedSession(null);
            } else {
              let sdata: any;
              try {
                sdata = JSON.parse(stext);
                if (!mounted) return;
                setLoadedSession(sdata);
                // prefill company in participant details
                setParticipant((p) => ({ ...p, company: sdata.company_name || p.company }));
              } catch (e) {
                // invalid JSON — treat as missing session but continue
                setLoadedSession(null);
              }
            }
          }
        }

        // fetch questions (safe parse)
        const qres = await fetch(`${API_BASE}/questions`);
        if (!qres.ok) {
          // treat as no questions available
          setLoadedQuestions([]);
        } else {
          const qtext = await qres.text();
          if (!qtext) {
            setLoadedQuestions([]);
          } else {
            try {
              const qdata = JSON.parse(qtext);
              if (!mounted) return;
              setLoadedQuestions(qdata || []);
            } catch (e) {
              // invalid JSON — show error
              throw new Error('Questions response is not valid JSON');
            }
          }
        }
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [token]);
  const [participant, setParticipant] = useState({ name: "", email: "", phone: "", designation: "", department: "", company: "" });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAnswer = (question_id: number, value: number) => {
    setAnswers((a) => ({ ...a, [String(question_id)]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // validate all questions answered
      const totalQuestions = (qs || []).length;
      const answeredCount = Object.keys(answers || {}).length;
      if (totalQuestions > 0 && answeredCount !== totalQuestions) {
        setError('Please answer all questions before submitting.');
        setSubmitting(false);
        return;
      }
      // ensure we have a session_id; if missing, create a lightweight session first
      let sessionId = sess?.session_id;
      if (!sessionId) {
        const createResp = await fetch(`${API_BASE}/sessions`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_name: `${participant.company || 'Public'} - ${new Date().toLocaleString()}`, session_description: 'Public session', company_name: participant.company || 'Unknown' })
        });
        if (!createResp.ok) throw new Error('Failed to create session for responses');
        const created = await createResp.json();
        sessionId = created.session_id;
      }

      const pres = await fetch(`${API_BASE}/participants`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, ...participant })
      });
      if (!pres.ok) throw new Error('Failed to save participant');
      const pdata = await pres.json();

      const responsePayload = Object.keys(answers).map((qid) => {
        const qidNum = Number(qid);
        return { question_id: Number.isFinite(qidNum) ? qidNum : qid, answer_value: answers[qid] };
      });

      const rres = await fetch(`${API_BASE}/responses`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participant_id: pdata.participant_id, responses: responsePayload })
      });
      if (!rres.ok) throw new Error('Failed to save responses');

      // redirect to thank-you page
      router.push('/thank-you');
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const totalQuestions = (qs || []).length;
  const answeredCount = Object.keys(answers || {}).length;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-sky-50 flex items-center overflow-hidden">
      {/* decorative blurred circles for glass effect */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-300 opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 w-96 h-96 rounded-full bg-sky-400 opacity-25 blur-3xl" />

      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 bg-gradient-to-b from-sky-600 via-sky-500 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold leading-tight">{sess?.session_name || 'Session'}</h1>
                  <p className="mt-2 text-sm opacity-90 max-w-sm">{sess?.session_description || 'Please fill this quick survey — it takes less than 5 minutes.'}</p>
                </div>
                <div className="ml-4">
                  <div className="text-xs uppercase tracking-wider text-sky-100">{sess?.company_name || 'Company'}</div>
                  <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Public Form</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm opacity-90">Questions</div>
                <div className="mt-2 text-2xl font-bold">{answeredCount}/{totalQuestions} answered</div>
                <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div style={{ width: `${totalQuestions ? (answeredCount/totalQuestions*100) : 0}%` }} className="h-2 bg-white rounded-full transition-all" />
                </div>
                <p className="mt-4 text-xs opacity-80">All responses are anonymous and saved to the session.</p>
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              {error && <div className="text-red-600 mb-3">{error}</div>}
              {loading && <div className="text-slate-600 mb-3">Loading session...</div>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Name</label>
                  <input required placeholder="Name" value={participant.name} onChange={(e) => setParticipant({ ...participant, name: e.target.value })} className="mt-1 block w-full border border-slate-200 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <input required placeholder="Email" type="email" value={participant.email} onChange={(e) => setParticipant({ ...participant, email: e.target.value })} className="mt-1 block w-full border border-slate-200 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Phone</label>
                    <input placeholder="Phone" value={participant.phone} onChange={(e) => setParticipant({ ...participant, phone: e.target.value })} className="mt-1 block w-full border border-slate-200 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Designation</label>
                    <input placeholder="Designation" value={participant.designation} onChange={(e) => setParticipant({ ...participant, designation: e.target.value })} className="mt-1 block w-full border border-slate-200 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Department</label>
                    <input placeholder="Department" value={participant.department} onChange={(e) => setParticipant({ ...participant, department: e.target.value })} className="mt-1 block w-full border border-slate-200 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Company</label>
                    <input
                      placeholder="Company"
                      value={sess?.company_name ?? participant.company}
                      onChange={(e) => setParticipant({ ...participant, company: e.target.value })}
                      className="mt-1 block w-full border border-slate-200 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                      readOnly={!!sess}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800">Questions</h3>
                  <div className="mt-3 space-y-4 max-h-80 overflow-y-auto pr-2">
                    {(qs || []).map((q: any, idx: number) => {
                      const qid = String(q.question_id ?? q.item_id ?? idx);
                      const value = answers[qid] ?? 3;
                      return (
                        <div key={qid} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-xs text-slate-500">Question {idx + 1}</div>
                                    <div className="mt-1 text-sm text-slate-800 font-medium">{q.prompt || q.question_text || q.title}</div>
                                  </div>
                                  <div className="text-sm font-semibold text-slate-700">{answers[qid] ? answers[qid] : '—'}</div>
                                </div>
                                <div className="mt-3">
                                  <div className="flex items-center gap-2">
                                    {[1,2,3,4,5].map((n) => {
                                      const selected = answers[qid] === n;
                                      return (
                                        <button
                                          key={n}
                                          type="button"
                                          onClick={() => handleAnswer(q.question_id ?? q.item_id ?? idx, n)}
                                          className={`px-3 py-1 rounded-md border ${selected ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-700 border-slate-200'}`}
                                        >
                                          {n}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                        </div>
                      );
                    })}
                    {(!qs || qs.length === 0) && !loading && (
                      <div className="text-slate-500">No questions available for this session.</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button type="submit" disabled={submitting} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-md shadow hover:opacity-95 disabled:opacity-60">
                    {submitting ? 'Submitting...' : 'Submit Responses'}
                  </button>
                  <button type="button" onClick={() => { setParticipant({ name: '', email: '', phone: '', designation: '', department: '', company: '' }); setAnswers({}); }} className="px-4 py-2 border rounded-md text-slate-700">Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
