import "./button.css"

export default function UpdateButton({openModal}) {
    return(
        <button onClick={openModal} className="update-button">Update</button>
    )
}