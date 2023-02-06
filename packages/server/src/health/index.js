import { Router } from 'express'

import { checkDBConnection } from './service.js'

const router = Router()

router.get('/', async (req, res) => {
  const status = await checkDBConnection()
  res.send(status)
})

export default router
