export const signUser = (user, sign) => {
  console.log(user)
  sign(user.user, user.email, user.admin, user.date_expire)
}

export const logoutUser = logout => {
  logout()
}
