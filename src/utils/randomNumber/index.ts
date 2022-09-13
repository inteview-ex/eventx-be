// const { createHmac } = await import('crypto');
// const crypto = require('crypto');
export const getRandomNumber = (length: number) => {
  let token = ''
  for (let i = 0; i < length; i++) {
    token += Math.floor(Math.random() * 9)
  }

  // let value = crypto.randomBytes(10).toString('hex')
  return token
}
