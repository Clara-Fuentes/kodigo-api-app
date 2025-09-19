import { Input, Switch } from "@heroui/react";
import { useState, useEffect } from "react";

export default function UserForm({ initial, onSubmit, submitText = "Guardar" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initial) {
      setName(initial.name ?? "");
      setEmail(initial.email ?? "");
      setIsActive(Boolean(initial.isActive ?? true));
    }
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name,
      email,
      ...(password ? { password } : {}),
      isActive,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input label="Nombre *" value={name} onChange={(e) => setName(e.target.value)} isRequired variant="bordered" />
      <Input label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired variant="bordered" />
      <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="bordered" />
      <Switch isSelected={isActive} onValueChange={setIsActive}>Activo</Switch>
      <button className="db-btn" type="submit">{submitText}</button>
    </form>
  );
}
