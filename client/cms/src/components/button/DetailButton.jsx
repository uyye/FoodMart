import { useNavigate } from "react-router"
import "./button.css"

export default function DetailButton({children, toGO}) {
    const navigate = useNavigate()
    const handleOpenPage = ()=>{
        navigate(toGO)
    }
    return(
        <button className="detail-button" onClick={handleOpenPage}>
            {children}
        </button>
    )
}