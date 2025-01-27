import "./button.css"

export default function DeleteButton({children, handleDelete}) {
    return(
        <button onClick={handleDelete} className="delete-button">{children}</button>
    )
}