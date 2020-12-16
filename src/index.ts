require('dotenv').config()
import { createConnection, getConnection } from 'typeorm'
import 'reflect-metadata'
import 'source-map-support/register'
import 'dayjs'

async function bootstrap() {
  await createConnection()
  if (!getConnection().isConnected) {
    return setTimeout(() => bootstrap(), 100);
  }
  import('./twitch')
}

bootstrap()

process.on('unhandledRejection', (reason) => console.error(reason))
process.on('uncaughtException', (reason) => console.error(reason))
