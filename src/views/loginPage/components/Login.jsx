import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";


export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {token, setToken } = useContext(AuthContext);

  

  const onSubmitForm = ({ username, password }) => {
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data.token);
        setSuccessMessage(data.message ? data.message: "Successfuly");
        {data.message ? setToken("") : setToken(data.token)}

        console.log(token);
        
        reset();
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(err => {
        console.error("Login error:", err);
      });
  };

return (
<form
  onSubmit={handleSubmit(onSubmitForm)}
  style={{
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#1E1B2E", // fondo oscuro
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    fontFamily: "'Poppins', sans-serif",
    color: "#FFFFFF"
  }}
>
  <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#A78BFA" }}>Login</h2>

  <div style={{ marginBottom: "20px" }}>
    <input
      {...register("username", {
        required: { value: true, message: "Username is required" },
        pattern: {
          value: /^[^'-]+$/,
          message: "Username cannot contain apostrophes (') or hyphens (-)"
        },
        minLength: { value: 4, message: "Minimum 4 characters" },
        maxLength: { value: 20, message: "Maximum 20 characters" }
      })}
      type="text"
      placeholder="Username"
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #4C1D95",
        backgroundColor: "#2D2A3F",
        color: "#FFF",
        fontSize: "16px"
      }}
    />
    {errors.username && (
      <p style={{ color: "#F87171", fontSize: "14px", marginTop: "6px" }}>
        {errors.username.message}
      </p>
    )}
  </div>

  <div style={{ marginBottom: "20px" }}>
    <input
      {...register("password", {
        required: { value: true, message: "Password is required" },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/,
          message: "Password must be 6–20 characters, include letters and numbers"
        }
      })}
      type="password"
      placeholder="Password"
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #4C1D95",
        backgroundColor: "#2D2A3F",
        color: "#FFF",
        fontSize: "16px"
      }}
    />
    {errors.password && (
      <p style={{ color: "#F87171", fontSize: "14px", marginTop: "6px" }}>
        {errors.password.message}
      </p>
    )}
  </div>

  <button
    type="submit"
    style={{
      width: "100%",
      padding: "12px",
      backgroundColor: "#7C3AED",
      color: "#FFF",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s"
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#6D28D9")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#7C3AED")}
  >
    Sign in
  </button>
</form>
)}