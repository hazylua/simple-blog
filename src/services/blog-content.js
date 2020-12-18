import api from "./api"

// export const getPosts = () => {
//   return api().get("/blog/content")
// }

export const postSubmit = body => {
  return api().post("/blog/content", body, { withCredentials: true })
}

export const commentSubmit = body => {
  return api().post("/blog/comment", body, { withCredentials: true })
}

export const commentsGetByPageTitle = body => {
  return api().get(`/blog/comment?title=${body}`)
}
