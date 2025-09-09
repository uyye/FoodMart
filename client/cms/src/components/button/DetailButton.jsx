import { useNavigate } from "react-router"
import "./button.css"
import { BiDetail } from "react-icons/bi";


export default function DetailButton({children, toGO}) {
    const navigate = useNavigate()
    const handleOpenPage = ()=>{
        navigate(toGO)
    }
    return(
        <button className="detail-button" onClick={handleOpenPage}>
            <BiDetail/> <span>{children}</span>
        </button>
    )
}