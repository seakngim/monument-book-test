import api1 from "./api1"

const signin = async(data)=>{
    return await api1.post(`/auth/signin`, data)
}
const signup = async(data)=>{
    return await api1.post(`/auth/signup`, data)
}

const AuthService ={signin,signup};
export default AuthService;