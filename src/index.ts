/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

import { createConnection, getConnection } from 'typeorm'
import 'reflect-metadata'
import 'source-map-support/register'
import 'dayjs'

async function bootstrap() {
  await createConnection()
  if (!getConnection().isConnected) {
    return setTimeout(() => bootstrap(), 100)
  }

  import('./twitch')
  ;(await import('./web')).bootstrap()
}

bootstrap()

process.on('unhandledRejection', (reason, promise) => console.error(reason, promise))
process.on('uncaughtException', (reason) => console.error(reason))
