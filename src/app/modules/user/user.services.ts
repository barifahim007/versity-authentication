import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { autoGeneretdId } from './user.utls'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // incremnetal id
  const id = await autoGeneretdId()
  user.id = id

  // default password
  if (!user.password) {
    user.password = config.default_pass as string
  }

  // creating user on the databse
  const createdUser = User.create(user)
  return createdUser
}

export const userService = {
  createUser
}
