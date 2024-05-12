// secretaryController.ts
import { Request, Response } from "express"
import { fetchUserByIdRepository, updateUserStatusRepository } from "../repository/userRepository"

export async function approveRegistration(req: Request, res: Response): Promise<Response> {
  try {
    const { userId }: { userId: number } = req.body

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json("userId is required")
    }

    // Fetch the user by ID
    const user = await fetchUserByIdRepository(userId)

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Update the user status to 'approved'
    await updateUserStatusRepository(userId, "approved")

    return res.status(200).json({ success: true, message: "Affiliate approved successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

export async function denyRegistration(req: Request, res: Response): Promise<Response> {
  try {
    const { userId }: { userId: number } = req.body // Ensure userId is of type number

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json("userId is required")
    }

    // Fetch the user by ID
    const user = await fetchUserByIdRepository(userId)

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Update the user status to 'denied'
    await updateUserStatusRepository(userId, "denied")

    return res.status(200).json({ success: true, message: "Affiliate denied successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
