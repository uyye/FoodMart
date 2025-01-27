import "./button.css"

export default function OrderButton({children, handle}) {
    return(
        <button type="submit" className="order-button" onClick={handle}>{children}</button>
    )
}