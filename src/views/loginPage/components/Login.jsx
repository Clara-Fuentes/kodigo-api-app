import { useForm } from "react-hook-form";
import { useState } from "react";


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

  const togglePassword = () => setShowPassword(prev => !prev);

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
        console.log(data);
        setSuccessMessage(data.message ? data.message: "Successfuly");
        reset();
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(err => {
        console.error("Login error:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} >
      <h2>Login</h2>

      <div>
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
        />
        {errors.username && <p className="text-danger">{errors.username.message}</p>}
      </div>

      <div>
        <input
          {...register("password", {
            required: { value: true, message: "Password is required" },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/,
              message: "Password must be 6–20 characters, include letters and numbers"
            }
          })}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          style={{ paddingRight: "2.5rem" }}
        />
        
        {errors.password && <p style={{color:"#F55C3D"}}>{errors.password.message}</p>}
      </div>

      <button className="btn" type="submit">Sign in</button>

      {successMessage && <p className="text-success">{successMessage}</p>}
    </form>
  );
};
