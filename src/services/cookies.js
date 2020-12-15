export const findCookie = value => {
  if (typeof value != "string") return console.log("Not a string.")
  let cookies = document.cookie
  cookies = cookies.split(";").find(row => row.startsWith(`${value}`))
  if (cookies) {
    console.log(cookies.split("=")[1])
    return cookies.split("=")[1]
  } else return ""
}
