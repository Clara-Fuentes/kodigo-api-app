import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

export default function Login() {
  const { token, setToken, setUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  // cuando el token cambie a truthy → navegar
  useEffect(() => {
    if (token) navigate("/home", { replace: true });
  }, [token, navigate]);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    setMsg("");
    try {
      console.log("[login] payload:", { email, passwordLen: password?.length });

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let data = null;
      try { data = text ? JSON.parse(text) : null; } catch {}

      console.log("[login] status:", res.status, "data:", data);

      if (!res.ok) {
        throw new Error(data?.message || data?.error || `HTTP ${res.status}`);
      }

      const { ok, access_token, user, message } = data || {};
      if (!ok || !access_token) {
        setMsg(message || "Credenciales inválidas");
        return;
      }

      setToken(access_token);
      setUser(user);
      // 👆 navigate lo hace el useEffect cuando token esté listo
    } catch (e) {
      setMsg(e.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h2 style={styles.title}>Inicia sesión</h2>

        <div style={styles.group}>
          <label style={styles.label}>Email</label>
          <input
            {...register("email", {
              required: "Email requerido",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Email no válido" },
            })}
            placeholder="email@dominio.com"
            style={styles.input}
            autoComplete="email"
          />
          {errors.email && <p style={styles.err}>{errors.email.message}</p>}
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Contraseña</label>
          <div style={{ position: "relative" }}>
            <input
              {...register("password", {
                required: "Contraseña requerida",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              style={{ ...styles.input, paddingRight: 44 }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              style={styles.eye}
              aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPwd ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <p style={styles.err}>{errors.password.message}</p>}
        </div>

        <button disabled={loading} type="submit" style={styles.button}>
          {loading ? "Ingresando..." : "Sign in"}
        </button>

        {msg && <p style={styles.errCenter}>{msg}</p>}

        <p style={{ textAlign: "center", marginTop: 14, color: "#c7c3e6" }}>
          ¿No tienes cuenta?{" "}
          <Link to="/login?tab=register" style={styles.link}>
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "32px 16px",
    background: "transparent",
  },
  form: {
    width: "100%",
    maxWidth: 480,
    padding: 28,
    borderRadius: 16,
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)), rgba(20,18,30,0.35)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    outline: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 20px 60px rgba(0,0,0,.35)",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
  },
  title: { textAlign: "center", marginBottom: 18, color: "#c4b5fd", fontSize: 28, fontWeight: 800 },
  group: { marginBottom: 14 },
  label: { display: "block", marginBottom: 6, color: "#c7c3e6", fontSize: 14, fontWeight: 600 },
  input: {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1px solid #4C1D95", background: "#2D2A3F",
    color: "#fff", fontSize: 16, outline: "none",
  },
  eye: {
    position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
    background: "transparent", border: "none", cursor: "pointer", fontSize: 18, color: "#c7c3e6",
  },
  button: {
    width: "100%", padding: 12,
    background: "linear-gradient(90deg,#7C3AED,#EC4899)",
    color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 800,
    cursor: "pointer", boxShadow: "0 10px 30px rgba(124,58,237,.35)",
  },
  link: { color: "#c4b5fd", textDecoration: "underline" },
  err: { color: "#F87171", fontSize: 14, marginTop: 6 },
  errCenter: { color: "#F87171", textAlign: "center", marginTop: 12 },
};
