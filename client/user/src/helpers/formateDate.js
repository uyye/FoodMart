export default function formateDate(date) {
    const data = new Date(date)
    const newDate = data.toLocaleDateString("en", {day:"numeric", month:"long", year:"numeric"})

    const day = data.toLocaleDateString("en", {weekday:"long"})
    return `${day}, ${newDate}`
}