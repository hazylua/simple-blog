let id = 0

const createSnackbar = options => {
  return {
    ...options,
    id: id++,
  }
}

export default createSnackbar
