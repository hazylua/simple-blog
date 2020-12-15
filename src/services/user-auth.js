import api from "./api"

export const isBrowser = () => typeof window !== "undefined"

export const userRegister = body => {
  return api().post("/user/register", body)
}

export const userLogin = body => {
  return api().post("/user/login", body, {
    withCredentials: true,
  })
}
