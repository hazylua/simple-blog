import api from "./api"

export const contactSubmit = body => {
  return api().post("/blog/contact", body)
}
