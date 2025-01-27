import "./button.css"

export default function ContactButton({children, handleButton}) {
    return(
        <button className="contact-button" onClick={handleButton}>{children}</button>
    )
}