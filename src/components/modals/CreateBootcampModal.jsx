import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input, Button } from "@heroui/react";
import { useState, useEffect } from "react";

export default function CreateBootcampModal({ isOpen, onOpenChange, onSubmit, loading = false }) {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [desc, setDesc] = useState("");
  const [weeks, setWeeks] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => { if (!isOpen) { setTitle(""); setArea(""); setDesc(""); setWeeks(""); setOpen(true); } }, [isOpen]);

  async function handleSubmit() {
    if (!title) return alert("El título es obligatorio");
    await onSubmit({ title, area: area || undefined, description: desc || undefined, weeks: weeks ? Number(weeks) : undefined, isOpen: Boolean(open) });
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      portalContainer={typeof window !== "undefined" ? document.body : undefined}
      motionProps={{}}
      classNames={{
        backdrop: "z-[2147483000]",
        wrapper: "z-[2147483001]",
        base: "z-[2147483002] bg-[#12131a] border border-white/10 rounded-2xl",
        header: "border-b border-white/10",
        footer: "border-t border-white/10",
        body: "text-white",
      }}
    >
      <ModalContent>
        <ModalHeader>Nuevo bootcamp</ModalHeader>
        <ModalBody>
          <div className="db-form">
            <Input label="Título *" variant="bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input label="Área" variant="bordered" value={area} onChange={(e) => setArea(e.target.value)} />
            <Input label="Descripción" variant="bordered" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Input label="Semanas" type="number" min={1} variant="bordered" value={weeks} onChange={(e) => setWeeks(e.target.value)} />
            <label className="db-check">
              <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} />
              <span>Inscripciones abiertas</span>
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => onOpenChange(false)} isDisabled={loading}>Cancelar</Button>
          <Button color="success" onPress={handleSubmit} isLoading={loading}>Crear</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
