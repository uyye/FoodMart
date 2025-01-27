export default function formateDate(date) {
    const data = new Date(date)
    const newDate = data.toLocaleDateString("id-ID", {day:"numeric", month:"long", year:"numeric"})

    const day = data.toLocaleDateString("id-ID", {weekday:"long"})
    return `${day}, ${newDate}`
}