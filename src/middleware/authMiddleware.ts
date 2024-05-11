import { Request, Response, NextFunction } from "express"
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from "../services/authService"
import User from "models/users.model"
interface CustomRequest extends Request {
  user?: User
}

export async function authenticateToken(req: CustomRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const authHeader = req.headers["authorization"]
    const accessToken = authHeader && authHeader.split(" ")[1]

    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing" })
    }

    const decodedToken = verifyAccessToken(accessToken)
    if (!decodedToken) {
      return res.status(403).json({ message: "Invalid access token" })
    }
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export async function refreshToken(req: Request, res: Response): Promise<Response> {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    // Check if refresh token is provided
    if (!token) {
      console.log("Refresh token is missing")
      return res.status(400).json({ message: "Refresh token is missing" })
    }

    // Verify the refresh token
    const decodedToken = verifyRefreshToken(token)
    console.log("Decoded refresh token:", decodedToken)
    // Check if refresh token is valid
    if (!decodedToken) {
      console.log("Invalid refresh token")
      return res.status(403).json({ message: "Invalid refresh token" })
    }

    // Generate a new access token
    const accessToken = generateAccessToken(decodedToken)

    // Respond with the new access token
    return res.status(200).json({ success: true, accessToken })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export function permission(requiredRole: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" })
    }

    try {
      const decodedToken: any = verifyAccessToken(token)
      const userRole = decodedToken.role

      if (userRole !== requiredRole) {
        return res.status(403).json({ message: "Unauthorized access" })
      }

      next()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error" })
    }
    return null
  }
}
