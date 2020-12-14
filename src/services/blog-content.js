import api from "./api"

// export const getPosts = () => {
//   return api().get("/blog/content")
// }

export const postSubmit = body => {
  return api().post("/blog/content", body)
}
