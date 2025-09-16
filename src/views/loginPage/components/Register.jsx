import { useState } from "react";
import { useForm } from "react-hook-form";


export const Register = () => {

    //Other hooks
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    
    //useForm hook
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm();

    const password = watch("password");

    const onSubmitForm = ({ username, password}) => {
        
        fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "username" : username,
                "password" : password 
            })
        })
        .then(res => res.json())
        .then(({message}) =>  {
            console.log(message)
        
            setSuccessMessage(message)
    
            setTimeout(() => {
               setSuccessMessage("") 
            }, 2000)
    
            reset()
    })
        .catch(er => console.log(er))
        
        
    }

 return(   
  <>
  <h2 style={{ textAlign: "center", marginTop: "40px", color: "#A78BFA", fontFamily: "'Poppins', sans-serif" }}>
    Register
  </h2>

  <form
    onSubmit={handleSubmit(onSubmitForm)}
    style={{
      maxWidth: "400px",
      margin: "30px auto",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "#1E1B2E",
      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      fontFamily: "'Poppins', sans-serif",
      color: "#FFFFFF"
    }}
  >
    <div style={{ marginBottom: "20px" }}>
      <input
        {...register("username", {
          required: { value: true, message: "Its empty field" },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/,
            message: "Username must be 4–20 characters with letters and numbers"
          }
        })}
        type="text"
        placeholder="Username..."
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
          required: { value: true, message: "Its empty field" },
          pattern: {
            value: /^[^'-]+$/,
            message: "It's not a valid password"
          }
        })}
        type={showPassword ? "text" : "password"}
        placeholder="Password..."
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

    <div style={{ marginBottom: "20px" }}>
      <input
        {...register("confirmPassword", {
          required: { value: true, message: "Confirm password" },
          validate: (value) => value === password || "Password not match"
        })}
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password..."
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
      {errors.confirmPassword && (
        <p style={{ color: "#F87171", fontSize: "14px", marginTop: "6px" }}>
          {errors.confirmPassword.message}
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
      Sign up
    </button>
  </form>

  {successMessage && (
    <p style={{ textAlign: "center", color: "#4ADE80", fontSize: "16px", marginTop: "20px" }}>
      {successMessage}
    </p>
  )}
</>
)}
