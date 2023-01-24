import { Router } from 'express'

import { createQuoteIndex, checkQuoteConnection } from './store.js'

const router = Router()

// Setup stuff
router.get('/init', (req, res) => {
  createQuoteIndex()
  res.send('INIT DB.')
})
router.get('/health', async (req, res) => {
  const status = await checkQuoteConnection()
  res.send(status)
})

// CRUD routes
router.get('/', (req, res) => {
  res.send('GET route on quotes.')
})
router.get('/:id', (req, res) => {
  console.log(req.params)
  res.send(`GET ${req.params.id} route on quote.`)
})
router.post('/', (req, res) => {
  res.send('POST route on quote.')
})
router.put('/', (req, res) => {
  res.send('PUT route on quote.')
})
router.delete('/', (req, res) => {
  res.send('DELETE route on quote.')
})

export default router
