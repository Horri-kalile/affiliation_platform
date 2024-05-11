import jwt from "jsonwebtoken"
import User from "models/users.model"
export function generateAccessToken(user: User): string {
  return jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1800s"
  })
}

export function generateRefreshToken(user: User): string {
  return jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET as string)
}

export function verifyAccessToken(token: string): any {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
  } catch (error) {
    return null
  }
}

export function verifyRefreshToken(token: string): any {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
  } catch (error) {
    return null
  }
}

export function verifyResetToken(token: string): any {
  try {
    return jwt.verify(token, process.env.RESET_TOKEN_SECRET as string)
  } catch (error) {
    return null
  }
}
