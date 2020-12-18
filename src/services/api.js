import axios from "axios"

const api = () => {
  return axios.create({
    baseURL: "https://yb00-simple-blog-backend.herokuapp.com/",
    timeout: 5000,
  })
}

export default api
