import axios from "axios";

// default baseURL of API
// main used api path
const instance = axios.create({
    baseURL: "http://139.59.219.217:5102",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})

export default instance;