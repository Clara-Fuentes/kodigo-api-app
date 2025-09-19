// src/api/bootcamps.service.mini.js
import { http, BASE_URL } from "./http";

/** Normalizador mínimo para la UI */
const mapBootcampApiToUi = (x, i = 0) => ({
  id: x.id ?? i + 1,
  title: x.title ?? x.name ?? "Bootcamp",
  description: x.description ?? "",
  category: x.area ?? x.category ?? "General",
  weeks: x.weeks ?? x.duration ?? 12,
  modality: x.modality ?? "Online",
  price: typeof x.price === "number" ? x.price : 0,
  image: x.image ?? null,
  featured: Boolean(x.featured),
  favorite: Boolean(x.favorite),
});

/**
 * Lista compacta para el widget del dashboard
 * Respeta `?q=` si el backend lo soporta y limita a 8 en UI.
 */
export async function listBootcampsMini(q = "") {
  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  // si tu API soporta limit, también lo mandamos; si no, lo recortamos client-side
  qs.set("limit", "8");

  try {
    const res = await http(`/bootcamps?${qs.toString()}`);
    const list = Array.isArray(res?.data) ? res.data : res;
    return (list || []).slice(0, 8).map(mapBootcampApiToUi);
  } catch {
    return [];
  }
}

/**
 * Crea un bootcamp (tu controller está protegido por JWT).
 * Requiere que `localStorage.token` exista (Authorization: Bearer ...).
 * payload según CreateBootcampDto:
 * { title: string, area?: string, description?: string, weeks?: number, isOpen?: boolean }
 */
export async function createBootcampDash(payload) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/bootcamps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok || data?.ok === false) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data?.data ?? data;
}

/** (Opcional) Obtener detalle por id ya normalizado para la UI */
export async function getBootcampMini(id) {
  const res = await http(`/bootcamps/${id}`);
  const obj = res?.data ?? res;
  return mapBootcampApiToUi(obj);
}
