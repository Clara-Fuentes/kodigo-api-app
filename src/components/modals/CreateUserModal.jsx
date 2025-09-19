import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input, Button } from "@heroui/react";
import { useState, useEffect } from "react";

export default function CreateUserModal({ isOpen, onOpenChange, onSubmit, loading = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => { if (!isOpen) { setName(""); setEmail(""); setPass(""); } }, [isOpen]);

  async function handleSubmit() {
    if (!name || !email || !pass) return alert("Completa nombre, email y contraseña");
    await onSubmit({ name, email, password: pass });
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      /** Monta en <body> y evita stacking del contenido */
      portalContainer={typeof window !== "undefined" ? document.body : undefined}
      /** Evita animación que a veces “empuja” desde el contenedor */
      motionProps={{}}
      /** Fuerza z-index MUY alto (por encima de cualquier sombra/tarjeta) */
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
        <ModalHeader>Nuevo usuario</ModalHeader>
        <ModalBody>
          <div className="db-form">
            <Input label="Nombre" variant="bordered" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" variant="bordered" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Contraseña" type="password" variant="bordered" value={pass} onChange={(e) => setPass(e.target.value)} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => onOpenChange(false)} isDisabled={loading}>Cancelar</Button>
          <Button color="primary" onPress={handleSubmit} isLoading={loading}>Crear</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
