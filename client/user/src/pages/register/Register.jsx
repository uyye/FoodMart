import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
import { IoFastFoodSharp } from "react-icons/io5";
import instance from '../../api/axiosInstance';
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState("")
    const [inputData, setInputData] = useState({
        name:"",
        email:"",
        password:"",
        role:"user"
    })

    const handleinputChange = (e)=>{
        const {name, value} = e.target
        setInputData({
            ...inputData,
            [name]:value
        })
    }

    const handleRegisterData = async(e)=>{   
        e.preventDefault()
        try {
            const {data} = await instance({
                method:"post",
                url:"/users/register",
                data:inputData
            })
            Swal.fire({
                title:"Success",
                text:"Success registered account",
                icon:"success",
                showConfirmButton:false,
                timer:2000
            })
            navigate("/login")
            
        } catch (error) {            
            setErrors(error.response.data)
        }
        
    }
    return(
        <div className="loginContainer">
            <div className="loginContent">  
                <div className="lottie">
                <DotLottieReact
                    src="https://lottie.host/db0abac1-a225-4014-95c0-fff4e80008e0/DVpk3vdhTz.lottie"
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
                            <h1>Manga register</h1>
                            <p>Buat akun untuk menjelajah</p>
                        </div>
                        <form className="loginForm" onSubmit={handleRegisterData}>
                            <div className="loginLabel">
                                <label className="formLabel" htmlFor="">Name</label>
                                <input className={`inputText ${errors === "name is required"? "error": ""}`} name='name' type="text" placeholder="Masukan nama..." onChange={handleinputChange} />
                                {errors === "name is required" && <p className='errorMessage'>Siapa nama anda?</p>}
                            </div>
                            <div className="loginLabel">
                                <label className="formLabel" htmlFor="">Email</label>
                                <input className={`inputText ${(errors === "incorrect email format" ||errors === "email must be unique") ? "error": ""}`} name='email' type="text" placeholder="Masukan email..." onChange={handleinputChange} />
                                {errors === "incorrect email format" && <p className='errorMessage'>Masukan email atau periksa format email!</p>}
                                {errors === "email must be unique" && <p className='errorMessage'>Email sudah digunakan!</p>}
                            </div>
                            <div className="loginLabel">
                                <label className="formLabel" htmlFor="">Password</label>
                                <input className={`inputText ${errors === "password must be at least 6 characters long" ? "error": ""}`} name='password' type="text" placeholder="Masukan password..." onChange={handleinputChange}/>
                                {errors === "password must be at least 6 characters long" && <p className='errorMessage'>Masukan password minimal 6 karakter!</p>}
                            </div>
                            <div className="loginSubmit">
                                <button className="loginButton" type="submit">Daftar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}