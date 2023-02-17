import { Router } from 'express'

import { addItem, getItem, getAllItems, updateItem, deleteItem } from './service.js'
import validator from './validation.js'

const router = Router()

// CRUD routes
router.get('/', async (req, res) => {
  try {
    const result = await getAllItems()
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await getItem(id)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
})
router.post('/', async (req, res) => {
  const { body } = req

  try {
    validator.validate(body)

    const result = await addItem(body)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
})
router.put('/', async (req, res) => {
  const { body } = req

  try {
    validator.validate(body)

    const result = await updateItem(body)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await deleteItem(id)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
})

export default router
