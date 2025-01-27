export default function formateHours(date){
    const data = new Date(date)
    
    const hours = data.toLocaleTimeString("id-ID", {
        hour:"2-digit",
        minute:"2-digit",
        hour12:true
    })

    return hours
}