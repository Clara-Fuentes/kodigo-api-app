// Normaliza lo que viene de la API (o mocks) al formato que usa la UI.
export function mapBootcampApiToUi(x, i = 0) {
  return {
    id: x.id ?? i + 1,
    title: x.title ?? x.name ?? "Bootcamp",
    description: x.description ?? "",
    category: x.area ?? x.category ?? "General",
    weeks: x.weeks ?? x.duration ?? 12,
    // campos que tu API aún no tiene → defaults seguros
    modality: x.modality ?? "Online",
    price: typeof x.price === "number" ? x.price : 0,
    image: x.image ?? null,
    featured: Boolean(x.featured),
    favorite: Boolean(x.favorite),
  };
}
