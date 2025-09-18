export const MOCK_BOOTCAMPS = [
  {
    id: 1,
    title: "Full Stack JavaScript",
    description: "Aprende desarrollo web con JS, React y Node.js",
    category: "Desarrollo Web",
    modality: "Online",
    weeks: 16,
    price: 2499,
    favorite: true,
    image: null
  },
  {
    id: 2,
    title: "Data Science con Python",
    description: "Análisis de datos y ML con Python",
    category: "Data Science",
    modality: "Híbrido",
    weeks: 20,
    price: 2799,
    favorite: false,
    image: null
  },
  {
    id: 3,
    title: "UX/UI Design",
    description: "Diseña experiencias digitales excepcionales",
    category: "Diseño",
    modality: "Presencial",
    weeks: 12,
    price: 1999,
    favorite: false,
    image: null
  }
];

export function fetchBootcampsMock(delay = 500) {
  return new Promise((res) => setTimeout(() => res(MOCK_BOOTCAMPS), delay));
}

export function fetchBootcampByIdMock(id, delay = 400) {
  return new Promise((res, rej) =>
    setTimeout(() => {
      const item = MOCK_BOOTCAMPS.find((x) => String(x.id) === String(id));
      item ? res(item) : rej(new Error("No encontrado"));
    }, delay)
  );
}
