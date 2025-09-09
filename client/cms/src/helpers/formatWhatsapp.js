const formatWhatsapp = (phoneNumber)=>{
    if(!phoneNumber) return ""

    let cleaned = phoneNumber.replace(/[\s.-]/g, "");

    if(cleaned.startsWith('0')){
        cleaned = "62" + cleaned.slice(1)
    }

    return cleaned
}

export default formatWhatsapp