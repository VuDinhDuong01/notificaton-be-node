import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'

export const signJWT = async (payload: { user_id: string }): Promise<String> => {
  return await new Promise<String>((resolve, reject) => {
    return jwt.sign(payload, 'access_token', { algorithm: 'HS256', expiresIn: '1m' }, function (err, token) {
      if (err) {
        reject({
          status: 401,
          error: 'token_expired',
          message: 'Your access token has expired. Please refresh your token or log in again.'
        })
      }
      resolve(token as string)
    })
  })
}

export const verifyJWT = async (token: string) => {
  return await new Promise((resolve, reject) => {
    return jwt.verify(token, 'access_token', function (err, user) {
      if (err) {
        reject({
          status: 401,
          error: 'token_expired',
          message: 'Your access token has expired. Please refresh your token or log in again.'
        })
      }
      resolve(user as string)
    })
  })
}

export const decodeJWT = (token: string) => {
  return jwtDecode(token)
}
