import { Router } from 'express'

import { getQuotes } from './service.js'

const router = Router()

// CRUD routes
router.get('/', async (req, res) => {
  const allQuotes = await getQuotes()
  res.json(allQuotes)
})
// router.get('/:id', (req, res) => {
//   console.log(req.params)
//   res.send(`GET ${req.params.id} route on quote.`)
// })
// router.post('/', (req, res) => {
//   res.send('POST route on quote.')
// })
// router.put('/', (req, res) => {
//   res.send('PUT route on quote.')
// })
// router.delete('/', (req, res) => {
//   res.send('DELETE route on quote.')
// })

export default router
