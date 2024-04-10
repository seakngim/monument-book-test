import axios from 'axios';


const apiImage = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
    }
})

apiImage.interceptors.request.use((s) => {
    const token = localStorage.getItem("token");
    s.headers.Authorization = "Bearer "+ token;
    return s;
});

export default apiImage;
