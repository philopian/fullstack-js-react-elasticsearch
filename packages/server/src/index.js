import cors from 'cors'
import express from 'express'

import config from './config.js'

const { REST_PORT, REST_API_URL } = config
const app = express()
app.use(express.json())

app.use(cors(config.corsOptions))

// Define the `/api/*` routes
const api = new express.Router()
app.use('/api/', api)

api.get('/', (req, res) => {
  setTimeout(() => {
    res.json({ message: 'Hello from express.js!' })
  }, 500) // simulate some latency
})

app.all('*', (req, res) => {
  setTimeout(() => {
    res.json({ message: '[Catch all URI]' })
  }, 500) // simulate some latency
})

app.listen(REST_PORT, () => {
  console.log(`🎉The magic happens at ${REST_API_URL}/api`)
})
