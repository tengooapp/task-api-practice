import { AppDataSource } from '../data-source'
import { User } from '../entity/User'

const userRepository = AppDataSource.getRepository(User)

export async function createUser(data: { name: string; email: string }): Promise<User> {
  const user = userRepository.create(data)
  return userRepository.save(user)
}

export async function getUserById(id: number): Promise<User | null> {
  return userRepository.findOneBy({ id })
}
