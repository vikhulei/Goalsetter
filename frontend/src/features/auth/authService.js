import axios from 'axios'

// const  API_URL = 'https://goalsetter-a2f62cd2b8b7.herokuapp.com/api/users/'
const  API_URL = 'http://localhost:5000/api/users/'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}
//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout user

const logout = () => {
    localStorage.removeItem('user')
    //can be done through httm only cookie ??
}

const authService = {
    register,
    login,
    logout
}

export default authService