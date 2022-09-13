const IsDevelopment = () => {
  let isDevelopment = false
  if (
    process.env.NODE_ENV !== 'production'
  ) {
    isDevelopment = true
  }
  // console.log('isDevelopment', isDevelopment)
  return isDevelopment
}

export { IsDevelopment }
