import "./login.css"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom"
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState("")
    const [inputData, setInputData] = useState({
        email:"",
        password:""
    })

    const handleChangeInput = (e)=>{
        const {name, value} = e.target
        setInputData({
            ...inputData,
            [name]:value
        })
    }

    const handleLoginSubmit = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await instance({
                method:"post",
                url:"/users/login",
                data:inputData
            })

            localStorage.setItem("access_token", data.token)
            Swal.fire({
                title:"Login success",
                icon:"success",
                showConfirmButton:false,
                timer:2000
            })
            navigate("/")
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    
    return(
        <div className="loginContainer">
            <div className="loginContent">  
                <div className="lottie">
                <DotLottieReact
                    src="https://lottie.host/9bc44fb7-63e8-46f4-831c-8aa02a682fff/0ATV5u32pM.lottie"
                    loop
                    autoplay
                    style={{ maxWidth: "100%", height: "auto" }}
                />
                </div>
                <div className="loginFc">
                    <div className="loginSide">
                        <div className="loginTag">
                            <p className="logo"><IoFastFoodSharp/></p>
                            <br />
                            <h1>Welcome back</h1>
                            <p>Temukan makanan favoritmu</p>
                        </div>
                        <form onSubmit={handleLoginSubmit} className="loginForm">
                            <div className="loginLabel">
                                <label className="formLabel" htmlFor="">Email</label>
                                <input className="inputText" type="text" name="email" onChange={handleChangeInput} placeholder="Masukan email..." />
                            </div>
                            {errors && <p className="errorMessage">Email atau password anda salah!</p>}
                            <div className="loginLabel">
                                <label className="formLabel" htmlFor="">Password</label>
                                <input className="inputText" type="password" name="password" onChange={handleChangeInput} placeholder="Masukan password..."/>
                            </div>
                            <div className="loginSubmit">
                                <button className="loginButton" type="submit">Login</button>
                                <p>Belum punya akun? silahkan <Link to={"/register"} style={{color:"red"}}>Daftar</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}