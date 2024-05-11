import jwt from "jsonwebtoken"
import User from "../models/users.model"
import * as nodemailer from "nodemailer"

export function generateResetToken(user: User): string {
  return jwt.sign({ id: user.id }, process.env.RESET_TOKEN_SECRET as string, {
    expiresIn: "5min"
  })
}

export async function sendResetEmail(user: User, resetToken: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset Request",
    text:
      `Dear ${user.email},\n\n` +
      "You have requested to reset your password. Click on the following link to reset your password:\n\n" +
      `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset_password?token=${resetToken}\n\n` +
      "If you did not request this, please ignore this email.\n\n" +
      "Best regards,\nYour App Team"
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Password reset email sent successfully.")
  } catch (error) {
    console.error("Error sending password reset email:", error)
    throw error
  }
}
