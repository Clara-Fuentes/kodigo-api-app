const BASE_URL = "http://localhost:3000/api";

export async function api(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  const auth = token || localStorage.getItem("token");
  if (auth) headers.Authorization = `Bearer ${auth}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // intenta parsear
  let data;
  try { data = await res.json(); } catch { data = null; }

  // normaliza error http
  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
