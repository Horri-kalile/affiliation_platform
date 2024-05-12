import User from "../models/users.model"
import bcrypt from "bcrypt"

export const createNewUserRepository = async (userData: {
  email: string
  password: string
  role: string
  status: string
}): Promise<User> => {
  const newUser = await User.create(userData)
  return newUser
}

export const fetchAllUsersRepository = async (): Promise<User[]> => {
  const users = await User.findAll()

  return users
}

export const fetchUserByAddressRepository = async (email: string): Promise<User | null> => {
  try {
    const user = await User.findOne({
      where: { email }
    })

    return user ? user : null
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateResetTokenRepository = async (userId: number, resetToken: string): Promise<void> => {
  try {
    await User.update({ resetToken }, { where: { id: userId } })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updatePasswordRepository = async (id: number, newPassword: string): Promise<boolean> => {
  try {
    console.log(id)
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const result = await User.update({ password: hashedPassword }, { where: { id } })

    if (result[0] === 1) {
      console.log("Password updated successfully !")
      return true
    } else {
      console.log("No user found with the provided ID !")
      return false
    }
  } catch (error) {
    console.error("Error updating password in the database: " + error.message)
    throw error
  }
}

export const updateUserStatusRepository = async (userId: number, status: string): Promise<void> => {
  try {
    await User.update({ status }, { where: { id: userId } })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const fetchUserByEmailAndStatus = async (email: string, status: string): Promise<User | null> => {
  try {
    const user = await User.findOne({
      where: { email, status }
    })

    return user ? user : null
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await User.findOne({
      where: { email }
    })

    return user ? user : null
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const fetchUserByIdRepository = async (userId: number): Promise<User | null> => {
  try {
    const user = await User.findByPk(userId)
    return user || null
  } catch (error) {
    console.error(error)
    throw error
  }
}
