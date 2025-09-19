import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../../api/client";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [msg, setMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pwd = watch("password");

  const onSubmit = async ({ name, email, password }) => {
    try {
      setLoading(true);
      setMsg(""); setOkMsg("");
      const res = await api("/users", {
        method: "POST",
        body: { name, email, password },
      });
      if (res?.ok) {
        setOkMsg("Usuario creado. Ahora inicia sesión.");
        // opcional: navegar directo al login
        setTimeout(() => navigate("/login", { replace: true }), 1200);
      } else {
        setMsg(res?.message || "No se pudo registrar");
      }
    } catch (e) {
      setMsg(e.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2 style={styles.title}>Register</h2>

      <div style={styles.group}>
        <input
          {...register("name", { required: "Nombre requerido", minLength: { value: 2, message: "Mínimo 2" } })}
          placeholder="Tu nombre"
          style={styles.input}
        />
        {errors.name && <p style={styles.err}>{errors.name.message}</p>}
      </div>

      <div style={styles.group}>
        <input
          {...register("email", {
            required: "Email requerido",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Email no válido" },
          })}
          placeholder="email@dominio.com"
          style={styles.input}
        />
        {errors.email && <p style={styles.err}>{errors.email.message}</p>}
      </div>

      <div style={styles.group}>
        <input
          {...register("password", {
            required: "Contraseña requerida",
            minLength: { value: 6, message: "Mínimo 6" },
          })}
          type="password"
          placeholder="Contraseña"
          style={styles.input}
        />
        {errors.password && <p style={styles.err}>{errors.password.message}</p>}
      </div>

      <div style={styles.group}>
        <input
          {...register("confirm", {
            required: "Confirma tu contraseña",
            validate: (v) => v === pwd || "No coincide",
          })}
          type="password"
          placeholder="Confirmar contraseña"
          style={styles.input}
        />
        {errors.confirm && <p style={styles.err}>{errors.confirm.message}</p>}
      </div>

      <button disabled={loading} type="submit" style={styles.button}>
        {loading ? "Creando..." : "Sign up"}
      </button>

      {okMsg && <p style={styles.ok}>{okMsg}</p>}
      {msg && <p style={styles.errCenter}>{msg}</p>}

      <p style={{ textAlign: "center", marginTop: 12 }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: 400, margin: "40px auto", padding: 30, borderRadius: 12,
    background: "#1E1B2E", color: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,.3)",
    fontFamily: "Poppins, sans-serif",
  },
  title: { textAlign: "center", marginBottom: 20, color: "#A78BFA" },
  group: { marginBottom: 16 },
  input: {
    width: "100%", padding: 12, borderRadius: 8, border: "1px solid #4C1D95",
    background: "#2D2A3F", color: "#fff", fontSize: 16,
  },
  button: {
    width: "100%", padding: 12, background: "#7C3AED", color: "#fff",
    border: "none", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer",
  },
  err: { color: "#F87171", fontSize: 14, marginTop: 6 },
  errCenter: { color: "#F87171", textAlign: "center", marginTop: 10 },
  ok: { color: "#4ADE80", textAlign: "center", marginTop: 10 },
};
