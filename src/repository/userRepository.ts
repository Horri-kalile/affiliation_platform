import User from "../models/users.model"

export const createNewUserRepository = async (userData: {
  email: string
  password: string
  role: string
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

export const fetchUserByemailRepository = async (email: string): Promise<User | null> => {
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
