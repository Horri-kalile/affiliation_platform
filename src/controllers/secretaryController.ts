// secretaryController.ts
import { Request, Response } from "express"
import { updateUserStatusRepository } from "../repository/userRepository"

import { Url } from "../models/url.model"
import { Banner } from "../models/banner.model"
import { Click } from "../models/click.model"
import { Sequelize } from "sequelize"

//approveRegistration and denyRegistration with one userid select
/*export async function approveRegistration(req: Request, res: Response): Promise<Response> {
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
}*/

//approveRegistration and denyRegistration with array userids
export async function approveRegistration(req: Request, res: Response): Promise<Response> {
  try {
    const { userIds }: { userIds: number[] } = req.body // Ensure userIds is an array of numbers

    // Check if userIds is provided and is an array
    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json("userIds must be provided as an array")
    }

    // Update the user status to 'approved' for all userIds
    await Promise.all(userIds.map((userId) => updateUserStatusRepository([userId], "approved")))

    return res.status(200).json({ success: true, message: "Affiliates approved successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
export async function denyRegistration(req: Request, res: Response): Promise<Response> {
  try {
    const { userIds }: { userIds: number[] } = req.body // Ensure userIds is an array of numbers

    // Check if userIds is provided and is an array
    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json("userIds must be provided as an array")
    }

    // Update the user status to 'denied' for all userIds
    await Promise.all(userIds.map((userId) => updateUserStatusRepository([userId], "denied")))

    return res.status(200).json({ success: true, message: "Affiliates denied successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

export async function createUrl(req: Request, res: Response): Promise<Response> {
  try {
    const { URL, dateAdded } = req.body
    const newUrl = await Url.create({ URL, dateAdded })
    return res.status(201).json({ success: true, data: newUrl })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Failed to create URL", error: error.message })
  }
}

// Retrieve all URLs with related banners and click counts
/*
export async function getUrls(req: Request, res: Response): Promise<Response> {
  try {
    const urlId = parseInt(req.params.id)
    if (!urlId) {
      return res.status(400).json("URL ID is required")
    }

    // Retrieve the URL from the database based on the ID
    const url = await Url.findByPk(urlId)

    if (!url) {
      return res.status(404).json("URL not found")
    }

    return res.status(200).json({ success: true, data: url })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}*/

export async function getUrls(req: Request, res: Response): Promise<Response> {
  try {
    const urls = await Url.findAll({
      include: [
        {
          model: Banner,
          attributes: ["id", "Url"]
        },
        {
          model: Click,
          attributes: [[Sequelize.fn("COUNT", Sequelize.col("id_click")), "clickCount"]]
        }
      ],
      group: ["Url.id"] // Group by URL ID to avoid duplication
    })
    return res.status(200).json({ success: true, data: urls })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Failed to retrieve URLs", error: error.message })
  }
}

// Update an existing URL
export async function updateUrl(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const { URL, dateAdded } = req.body
    const [updatedCount] = await Url.update({ URL, dateAdded }, { where: { id } })
    if (updatedCount === 0) {
      return res.status(404).json({ success: false, message: "URL not found" })
    }
    return res.status(200).json({ success: true, message: "URL updated successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Failed to update URL", error: error.message })
  }
}

// Delete a URL
export async function deleteUrl(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const deletedCount = await Url.destroy({ where: { id } })
    if (deletedCount === 0) {
      return res.status(404).json({ success: false, message: "URL not found" })
    }
    return res.status(200).json({ success: true, message: "URL deleted successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Failed to delete URL", error: error.message })
  }
}
