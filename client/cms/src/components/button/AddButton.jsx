import { MdOutlineAddBox } from "react-icons/md";


export default function AddButton({children, setModal}) {
    return(
        <button className="add-button" onClick={setModal}>
            <MdOutlineAddBox/> <span>{children}</span>
        </button>
    )
}