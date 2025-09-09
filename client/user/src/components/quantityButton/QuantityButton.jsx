
import "./quantityButton.css"
export default function QuantityButton({quantity, setQuantity, stock, onQuantityChange}) {
    const handleQuantityChange = (value)=>{
            let newQuantity = quantity
            if(value === "up" && quantity < stock){
                 newQuantity ++
            }else if(value === "down" && quantity > 1){
                 newQuantity --
            }
            if(setQuantity)setQuantity(newQuantity)
            if(onQuantityChange) onQuantityChange(newQuantity)
    }
    return(
        <div className="qbContainer">
            <button onClick={()=>handleQuantityChange("up")} className="quantity_button">+</button>
            <span className="quantity">{quantity}</span>
            <button onClick={()=>handleQuantityChange("down")} className="quantity_button">-</button>
        </div>
    )
}