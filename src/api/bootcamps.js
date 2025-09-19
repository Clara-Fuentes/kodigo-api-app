// src/api/bootcamps.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function listBootcamps(q = "") {
  const url = new URL(`${API_BASE}/api/bootcamps`);
  if (q) url.searchParams.set("q", q);
  const r = await fetch(url);
  const json = await r.json();
  if (!json?.ok) throw new Error("Error listando bootcamps");
  return json.data; // array
}

export async function getBootcamp(id) {
  const r = await fetch(`${API_BASE}/api/bootcamps/${id}`);
  const json = await r.json();
  if (!json?.ok) throw new Error("Bootcamp no encontrado");
  return json.data; // objeto
}

export async function createBootcamp(payload, token) {
  const r = await fetch(`${API_BASE}/api/bootcamps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  const json = await r.json();
  if (!json?.ok) throw new Error("Error creando bootcamp");
  return json.data;
}
