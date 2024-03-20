import { Request, Response } from 'express'
import { userService } from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const result = await userService.createUser(user)

    res.status(200).json({
      success: true,
      data: result,
      message: 'user created successfully!!!!!'
    })
  } catch {
    res.status(400).json({
      success: false,
      message: 'user not created!!!!'
    })
  }
}

export const userController = {
  createUser
}
