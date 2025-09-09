import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
import { IoFastFoodSharp } from "react-icons/io5";
import instance from '../../api/axiosInstance';
import Swal from "sweetalert2"
import { useNavigate } from 'react-router';
import CancelButton from '../../components/button/CancelButton';
import SubmitButton from '../../components/button/SubmitButton';
import { setAddUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

export default function InputUser({ modal }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState("")
    const [inputData, setInputData] = useState({
        name:"",
        email:"",
        password:"",
        role:"admin"
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
            console.log(data)
            dispatch(setAddUser(data.user))
            modal()
            
        } catch (error) {            
            setErrors(error.response.data)
        }
        
    }
  return (
    <div className="modal-overlay" onClick={modal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="loginFc">
          <div className="loginSide">
            <div className="loginTag">
              <br />
              <h1>Manga register</h1>
              <p>Daftarkan Admin</p>
            </div>
            <form className="loginForm" onSubmit={handleRegisterData}>
              <div className="loginLabel">
                <label className="formLabel" htmlFor="">
                  Name
                </label>
                <input
                  className={`inputText ${
                    errors === "name is required" ? "error" : ""
                  }`}
                  name="name"
                  type="text"
                  placeholder="Masukan nama..."
                  onChange={handleinputChange}
                />
                {errors === "name is required" && (
                  <p className="errorMessage">Siapa nama anda?</p>
                )}
              </div>
              <div className="loginLabel">
                <label className="formLabel" htmlFor="">
                  Email
                </label>
                <input
                  className={`inputText ${
                    errors === "incorrect email format" ||
                    errors === "email must be unique"
                      ? "error"
                      : ""
                  }`}
                  name="email"
                  type="text"
                  placeholder="Masukan email..."
                  onChange={handleinputChange}
                />
                {errors === "incorrect email format" && (
                  <p className="errorMessage">
                    Masukan email atau periksa format email!
                  </p>
                )}
                {errors === "email must be unique" && (
                  <p className="errorMessage">Email sudah digunakan!</p>
                )}
              </div>
              <div className="loginLabel">
                <label className="formLabel" htmlFor="">
                  Password
                </label>
                <input
                  className={`inputText ${
                    errors === "password must be at least 6 characters long"
                      ? "error"
                      : ""
                  }`}
                  name="password"
                  type="text"
                  placeholder="Masukan password..."
                  onChange={handleinputChange}
                />
                {errors === "password must be at least 6 characters long" && (
                  <p className="errorMessage">
                    Masukan password minimal 6 karakter!
                  </p>
                )}
              </div>
              <div className="loginSubmit">
                <SubmitButton>Submit</SubmitButton>
                <CancelButton onClose={modal}>Cancel</CancelButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
