import { fetchAllUsersRepository } from "../repository/userRepository"

export const getUsersService = async () => {
    const usersData = await fetchAllUsersRepository()
  
    return usersData
  }