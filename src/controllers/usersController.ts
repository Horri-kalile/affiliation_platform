import { Request, Response } from "express"
import { generateAccessToken, generateRefreshToken } from "../services/authService"
import { getUsersService } from "../services/userService"
import { createNewUserRepository, fetchUserByAddressRepository } from "../repository/userRepository"
import bcrypt from "bcrypt"

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await getUsersService()
    console.log(users)
    res.status(200).send({ success: true, data: users })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: error.message })
  }
}

export async function login(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
  try {
    const { address, password } = req.body

    // Check if the address and password are present
    if (!address || !password) {
      return res.status(400).json("Address and password are required")
    }

    // Retrieve user from the database based on the address
    const user = await fetchUserByAddressRepository(address)

    // Check if the user exists
    if (!user) {
      return res.status(404).json("User not found")
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {
      // Passwords match, generate an access token and a refresh token
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      // Respond with success, access token, and refresh token
      return res.status(200).json({ success: true, message: "Login successful", accessToken, refreshToken })
    } else {
      // Passwords don't match
      return res.status(401).json("Incorrect password")
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

export async function register(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
  try {
    const { address, password } = req.body

    // Check if the address and password are present
    if (!address || !password) {
      return res.status(400).json("Address and password are required")
    }

    // Check if the email address already exists in the database
    const existingUser = await fetchUserByAddressRepository(address)
    if (existingUser) {
      return res.status(409).json("Email address is already in use")
    }

    // Encrypt the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user with the hashed password and default role "affiliate"
    await createNewUserRepository({ address, password: hashedPassword, role: "affiliate" })

    // Respond with success
    return res.status(201).json({ success: true, message: "User created successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

export function getProtectedResource(req: Request, res: Response): void {
  res.status(200).json({ message: "Access to protected resource granted" })
}
