import axios from 'axios';


const api1 = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

export default api1;
