import { BASE_URL } from "./http";

export async function createUser(payload) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data?.message || "Error creando usuario");
  return data.user ?? data?.data ?? data;
}

export async function listUsersPublic({ q = "", limit = 8, page = 1 } = {}) {
  const qs = new URLSearchParams({ limit: String(limit), page: String(page) });
  if (q) qs.set("q", q);
  const res = await fetch(`${BASE_URL}/users/public?${qs.toString()}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data?.message || "Error listando usuarios");
  return Array.isArray(data?.data) ? data.data : [];
}

export async function getUser(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data?.message || "Error");
  return data.user ?? data?.data ?? data;
}

export async function updateUser(id, payload) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data?.message || "Error");
  return data.user ?? data?.data ?? data;
}

export async function deleteUser(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data?.message || "Error");
  return data;
}
