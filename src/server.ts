import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

// unchaughtExceptions
process.on('uncaughtException', error => {
  errorLogger.error(error), process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database as string)
    logger.info(` Database connected successfully`)

    // port listening
    app.listen(config.port, () => {
      logger.info(`the port is listening on ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`oh noo!!! database not connected ${error}`)
  }

  // unhandled rejections

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error), process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

// sigterm

process.on('SIGTERM', () => {
  logger.info(`SIGTERM is  received.......`)
  if (server) {
    server.close()
  }
})
