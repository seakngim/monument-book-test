import axios from 'axios';


const api2 = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

api2.interceptors.request.use((s) => {
    const token = localStorage.getItem("token");
    s.headers.Authorization = "Bearer "+ token;
    return s;
});

export default api2;
