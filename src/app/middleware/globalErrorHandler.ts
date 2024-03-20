import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../interface/errorMessage'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong...!'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'validationError') {
    const simplifiedError = handleValidationError(err)

    ;(statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessage = simplifiedError.errorMessage)
  } else if (err instanceof ApiError) {
    ;(statusCode = err?.statusCode),
      (message = err?.message),
      (errorMessage = err?.message
        ? [
            {
              path: '',
              message: err?.message
            }
          ]
        : [])
  } else if (err instanceof Error) {
    ;(message = err?.message),
      (errorMessage = err?.message
        ? [
            {
              path: '',
              message: err?.message
            }
          ]
        : [])
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.node_env !== 'production' ? err?.stack : undefined
  })
  next()
}

export default globalErrorHandler
