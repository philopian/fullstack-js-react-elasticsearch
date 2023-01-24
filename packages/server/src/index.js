import cors from 'cors'
import express from 'express'

import config from './config.js'
import { errorBadJson } from './middleware/error-handler.js'
import routes from './routes.js'

const { REST_PORT, REST_API_URL } = config
const app = express()

// Middleware (all routes)
app.use(errorBadJson)
app.use(express.json())
app.use(cors(config.corsOptions))

routes(app)

// Catch all
app.all('*', (req, res) => {
  setTimeout(() => {
    res.json({ message: '[Catch all URI]' })
  }, 500) // simulate some latency
})

app.listen(REST_PORT, () => {
  console.log(`🎉The magic happens at ${REST_API_URL}/api`)
})
