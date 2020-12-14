import axios from "axios"

const api = () => {
  return axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 5000,
  })
}

export default api
