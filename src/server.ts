import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

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
}

main()
