import { SiWhatsapp } from "react-icons/si";
import formatWhatsapp from "../../helpers/formatWhatsapp";

export default function WhatsappButton({children, phoneNumber, message}){
    
    const whatsapp = formatWhatsapp(phoneNumber)
    const handleButton = ()=>{
        const encodeMessage = encodeURIComponent(message || "");
        const url = `https://wa.me/${whatsapp}?text=${encodeMessage}`;
        window.open(url, "_blank")
    }
    
    return(
        <button onClick={handleButton} className="whatsapps-button">
            <SiWhatsapp/> {children}
        </button>
    )
}