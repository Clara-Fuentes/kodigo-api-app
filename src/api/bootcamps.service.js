import { http, BASE_URL } from "./http";

export const mapBootcamp = (x, i = 0) => ({
  id: x.id ?? i + 1,
  title: x.title ?? x.name ?? "Bootcamp",
  description: x.description ?? "",
  area: x.area ?? x.category ?? "General",
  weeks: x.weeks ?? x.duration ?? 12,
  isOpen: Boolean(x.isOpen ?? true),
  price: typeof x.price === "number" ? x.price : 0,
});

/** Lista de bootcamps (soporta q, limit, page) */
export async function listBootcamps({ q = "", limit, page } = {}) {
  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  if (limit) qs.set("limit", String(limit));
  if (page) qs.set("page", String(page));

  const res = await http(`/bootcamps?${qs.toString()}`);
  const arr = Array.isArray(res?.data) ? res.data : res;
  return arr.map(mapBootcamp);
}

/** Alias para compatibilidad (antes se llamaba getBootcamps en tus vistas) */
export const getBootcamps = listBootcamps;

/** Obtener un bootcamp por ID */
export async function getBootcamp(id) {
  const res = await http(`/bootcamps/${id}`);
  return mapBootcamp(res?.data ?? res);
}

/** Crear bootcamp */
export async function createBootcamp(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/bootcamps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.ok === false) throw new Error(json?.message || "Error creando");
  return mapBootcamp(json.data ?? json);
}

/** Actualizar bootcamp */
export async function updateBootcamp(id, data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/bootcamps/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.ok === false) throw new Error(json?.message || "Error editando");
  return mapBootcamp(json.data ?? json);
}

/** Eliminar bootcamp */
export async function deleteBootcamp(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/bootcamps/${id}`, {
    method: "DELETE",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.ok === false) throw new Error(json?.message || "Error eliminando");
  return { ok: true };
}
