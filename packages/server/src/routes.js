import { Router } from 'express'

import health from './health/index.js'
import quotes from './quotes/index.js'

export default function routes(app) {
  const api = new Router()
  app.use('/api/', api)

  // Routes
  api.use('/health', health)
  api.use('/quote', quotes)
}
