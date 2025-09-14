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
  return (
    <>Register

    <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
            <input {...register("username", {
                required: {value:true, message:"Its empty field"},
                pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/, message:"Username must be 4 20 characters..."},

            })} type="text" placeholder="Username..." />

            {errors.username && (<p>{errors.username.message}</p>)}
        </div>
        <div>
            <input {...register("password", {
                required:{value:true, message:"Its empty field"},
                pattern:{value:/^[^'-]+$/, message:"Its not a valid password"}
            })} type={showPassword ? "text" : "password"} placeholder="Password..." />
            {errors.password && (<p>{errors.password.message}</p>)}
        </div>
        <div>
            <input {...register("confirmPassword",{
                required:{value:true, message: "Confirm password"},
                validate: (value) => value === password || "Password not match"
            })} type={showPassword ? "text" : "password"} placeholder="Confirm Password..." />
            
            {errors.confirmPassword && (<p>{errors.confirmPassword.message}</p>)}
        </div>
        <button type="submit">Sign up</button>
    </form>

    <p>{successMessage}</p>
    
    </>
  )
}
