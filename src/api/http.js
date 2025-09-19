const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Cliente HTTP simple para la API
 * @param {string} path - ruta de la API, ej. "/bootcamps"
 * @param {object} opts - opciones fetch
 */
async function http(path, { method = "GET", headers = {}, body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "omit", // 👈 público; si necesitas auth/cookies: "include"
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const message =
      typeof data === "string" ? data : data?.message || "HTTP error";
    throw new Error(message);
  }

  return data;
}

export { http, BASE_URL };
