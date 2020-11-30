let id = 0

export default createSnackbar = options => {
  return {
    ...options,
    id: id++,
  }
}
