export const notify = (status, actions, style, displayTime) => {
  const { addSnackbar } = actions
  const options = {
    message: status,
    style: style,
    displayTime: displayTime,
  }
  addSnackbar(options)
}
