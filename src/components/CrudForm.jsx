import { useEffect, useState } from "react";

const empty = {
  title: "",
  category: "General",
  modality: "Online",
  weeks: 12,
  price: 0,
  description: "",
};

export default function CrudForm({ initialValues, onSubmit }) {
  const [v, setV] = useState(empty);
  useEffect(() => {
    setV({ ...empty, ...(initialValues || {}) });
  }, [initialValues]);

  function handle(e) {
    const { name, value } = e.target;
    setV((s) => ({ ...s, [name]: name === "weeks" || name === "price" ? Number(value) || 0 : value }));
  }

  function submit(e) {
    e.preventDefault();
    onSubmit?.(v);
  }

  return (
    <form className="form" onSubmit={submit}>
      <label className="form__row">
        <span>Título</span>
        <input name="title" value={v.title} onChange={handle} required />
      </label>

      <div className="form__row form__row--2">
        <label>
          <span>Categoría</span>
          <input name="category" value={v.category} onChange={handle} />
        </label>
        <label>
          <span>Modalidad</span>
          <select name="modality" value={v.modality} onChange={handle}>
            <option>Online</option>
            <option>Híbrido</option>
            <option>Presencial</option>
          </select>
        </label>
      </div>

      <div className="form__row form__row--2">
        <label>
          <span>Semanas</span>
          <input type="number" min="1" name="weeks" value={v.weeks} onChange={handle} />
        </label>
        <label>
          <span>Precio (USD)</span>
          <input type="number" min="0" name="price" value={v.price} onChange={handle} />
        </label>
      </div>

      <label className="form__row">
        <span>Descripción</span>
        <textarea name="description" rows={4} value={v.description} onChange={handle} />
      </label>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">Guardar</button>
      </div>
    </form>
  );
}
