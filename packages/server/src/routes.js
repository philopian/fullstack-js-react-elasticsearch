import { Router } from 'express'

import quotes from './quotes/routes.js'

export default function routes(app) {
  const api = new Router()
  app.use('/api/', api)

  // Routes
  api.use('/quotes', quotes)
}
