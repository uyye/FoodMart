import "./button.css"
import { MdOutlineDeleteOutline } from "react-icons/md";


export default function DeleteButton({children, handleDelete}) {
    return(
        <button onClick={handleDelete} className="delete-button">
            <MdOutlineDeleteOutline/><span>{children}</span>
        </button>
    )
}