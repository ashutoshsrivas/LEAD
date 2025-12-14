export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api';

export async function getSessions() {
  const res = await fetch(`${API_BASE}/sessions`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load sessions');
  return res.json();
}

export async function getParticipants(session_id: string) {
  const res = await fetch(`${API_BASE}/participants/${session_id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load participants');
  return res.json();
}

export async function getSession(session_id: string) {
  const res = await fetch(`${API_BASE}/sessions/${session_id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load session');
  return res.json();
}

export async function getSessionByToken(token: string) {
  const res = await fetch(`${API_BASE}/sessions/link/${token}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load session by token');
  return res.json();
}

export async function getQuestions() {
  const res = await fetch(`${API_BASE}/questions`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load questions');
  return res.json();
}

export async function generateQuestions(payload: any) {
  const res = await fetch(`${API_BASE}/questions/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to generate questions');
  }
  return res.json();
}

export async function createSession(payload: { session_name: string; session_description?: string; company_name: string }) {
  const res = await fetch(`${API_BASE}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to create session');
  }
  return res.json();
}

export async function generateReport(participant_id: number) {
  // trigger processing which generates results on the server
  const res = await fetch(`${API_BASE}/process/${participant_id}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to generate report');
  }
  return res.json();
}

export async function getReports(session_id?: string) {
  const url = session_id ? `${API_BASE}/results?session_id=${session_id}` : `${API_BASE}/results`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load reports');
  return res.json();
}

export async function getResult(participant_id: string | number) {
  const res = await fetch(`${API_BASE}/results/${encodeURIComponent(String(participant_id))}`, { cache: 'no-store' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to load report');
  }
  return res.json();
}
