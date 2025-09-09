import "./button.css"

export default function DetailButton({children, modal}) {
    return(
        <button className="detail-button" onClick={modal}>
            {children}
        </button>
    )
}