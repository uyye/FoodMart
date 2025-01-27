export default function FilterButton({children, handler}) {
    return(
        <button className="fillter-button" onClick={handler}>{children}</button>
    )
}