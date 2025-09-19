import { useState, useEffect } from "react";
import { Input, Textarea, Switch } from "@heroui/react";

export default function BootcampForm({ initial, onSubmit, submitText = "Guardar" }) {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [weeks, setWeeks] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title ?? "");
      setArea(initial.area ?? "");
      setDescription(initial.description ?? "");
      setWeeks(initial.weeks ?? "");
      setIsOpen(Boolean(initial.isOpen ?? true));
    }
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title,
      area: area || undefined,
      description: description || undefined,
      weeks: weeks ? Number(weeks) : undefined,
      isOpen,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input label="Título *" value={title} onChange={(e) => setTitle(e.target.value)} isRequired variant="bordered" />
      <Input label="Área" value={area} onChange={(e) => setArea(e.target.value)} variant="bordered" />
      <Textarea label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} variant="bordered" />
      <Input label="Semanas" type="number" min={1} value={String(weeks)} onChange={(e) => setWeeks(e.target.value)} variant="bordered" />
      <Switch isSelected={isOpen} onValueChange={setIsOpen}>Inscripciones abiertas</Switch>
      <button className="db-btn" type="submit">{submitText}</button>
    </form>
  );
}
