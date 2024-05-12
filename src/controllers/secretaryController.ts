// secretaryController.ts
import { Request, Response } from "express"
import { updateUserStatusRepository } from "../repository/userRepository"

export async function approveRegistration(req: Request, res: Response): Promise<Response> {
  try {
    const { userId }: { userId: number } = req.body // Ensure userId is of type number

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json("userId is required")
    }

    // Update the user status to 'approved'
    await updateUserStatusRepository(userId, "approved")

    return res.status(200).json({ success: true, message: "affiliate approved successfully" })
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

    // Update the user status to 'denied'
    await updateUserStatusRepository(userId, "denied")

    return res.status(200).json({ success: true, message: "affiliate denied successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
