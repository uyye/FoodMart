import axios from "axios"

// const urlServer = "https://foodmart.lawah.id"
const urlServer = "http://localhost:3000"
const instance = axios.create({
    baseURL:urlServer,
    headers:{
        'Content-Type':'application/json'
    }
})

export default instance