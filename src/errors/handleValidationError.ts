import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../app/interface/errorMessage'
import { IGenericErrorResponse } from '../app/interface/common'

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(elm => {
    return {
      path: elm?.path,
      message: elm?.message
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors
  }
}

export default handleValidationError
