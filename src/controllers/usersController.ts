import { Request, Response } from "express"
import { generateAccessToken, generateRefreshToken, verifyResetToken } from "../services/authService"
import { getUsersService } from "../services/userService"
import {
  createNewUserRepository,
  fetchUserByAddressRepository,
  updatePasswordRepository,
  fetchUserByEmail,
  updateUserRepository,
  deleteUserRepository
} from "../repository/userRepository"
import bcrypt from "bcrypt"
import { generateResetToken, sendResetEmail } from "../services/resetPasswordService"
import User from "../models/users.model"

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
    const { email, password } = req.body

    // Check if the email and password are present
    if (!email || !password) {
      return res.status(400).json("email and password are required")
    }

    // Retrieve user from the database based on the email
    const user = await fetchUserByEmail(email)

    // Check if the user exists
    if (!user) {
      // User not found
      return res.status(404).json("User not found")
    }
    if (user.status === "waiting list" || user.status === "") {
      return res.status(403).json("Your still in the waiting list")
    }
    // Check if the user is approved
    if (user.status === "denied") {
      return res
        .status(403)
        .json("Your request has been denied. Please contact the administrator for more information.")
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
    const { email, password } = req.body

    // Check if the email and password are present
    if (!email || !password) {
      return res.status(400).json("email and password are required")
    }

    // Check if the email already exists in the database
    const existingUser = await fetchUserByAddressRepository(email)
    if (existingUser) {
      return res.status(409).json("Email is already in use")
    }

    // Encrypt the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user with the hashed password and default role "affiliate" and status "waiting list"
    await createNewUserRepository({ email, password: hashedPassword, role: "affiliate", status: "waiting list" })

    // Respond with success and a message indicating the user is on the waiting list
    return res
      .status(201)
      .json({ success: true, message: "You have been registered successfully. You are now on the waiting list." })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

export async function forgotPassword(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
  console.log("Entered forgotPassword route")

  try {
    const { email } = req.body

    console.log("Received email:", email)

    // Validate the email field
    if (!email) {
      console.log("Email is required")
      return res.status(400).json({ success: false, message: "Email is required" })
    }

    // Retrieve user from the database based on the email
    const user = await fetchUserByAddressRepository(email)

    // Check if the user exists
    if (!user) {
      console.log("User not found")
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Generate a reset token and send a reset email
    const resetToken = generateResetToken(user)
    await sendResetEmail(user, resetToken)

    // Respond with success
    return res.status(200).json({ success: true, message: "Password reset instructions sent to your email" })
  } catch (error) {
    console.error("Error during password reset:", error)
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export async function resetPassword(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
  try {
    const { resetToken, newPassword } = req.body

    // Check if resetToken and newPassword are present
    if (!resetToken || !newPassword) {
      return res.status(400).json("Reset token and new password are required")
    }

    // Verify the reset token
    const decodedToken = verifyResetToken(resetToken)
    if (!decodedToken) {
      return res.status(403).json({ message: "Invalid reset token" })
    }

    // Update the user's password in the database

    await updatePasswordRepository(decodedToken.id, newPassword)

    // Respond with success
    return res.status(200).json({ success: true, message: "Password reset successful" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

export function getProtectedResource(req: Request, res: Response): void {
  res.status(200).json({ message: "Access to protected resource granted" })
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
  try {
    const userId = parseInt(req.params.id) // Extract userId from URL
    const { email, password, role } = req.body

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json("userId is required")
    }

    // Check if the user exists
    const existingUser = await User.findByPk(userId)
    if (!existingUser) {
      return res.status(404).json("User not found")
    }

    // Encrypt the new password (if provided)
    let hashedPassword
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    // Prepare the userData object for update
    const userData: { email?: string; password?: string; role?: string } = {}
    if (email) userData.email = email
    if (hashedPassword) userData.password = hashedPassword
    if (role) userData.role = role

    // Update user details
    await updateUserRepository(userId, userData)

    return res.status(200).json({ success: true, message: "User updated successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

// Delete a user
export async function deleteUser(req: Request, res: Response): Promise<Response> {
  try {
    const userId = parseInt(req.params.id) // Extract userId from URL

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json("userId is required")
    }

    // Check if the user exists
    const existingUser = await User.findByPk(userId)
    if (!existingUser) {
      return res.status(404).json("User not found")
    }

    // Delete the user
    await deleteUserRepository(userId)

    return res.status(200).json({ success: true, message: "User deleted successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
