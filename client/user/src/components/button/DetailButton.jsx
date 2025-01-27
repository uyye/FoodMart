import "./button.css"

export default function DetailButton({children}) {
    return(
        <button className="detail-button">
            {children}
        </button>
    )
}