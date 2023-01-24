import deepmerge from 'deepmerge'
import * as dotenv from 'dotenv'

dotenv.config()

const REST_PORT = process.env.REST_API_PORT || 3000
const CLIENT_PORT = process.env.CLIENT_SITE_PORT || 8080
const REST_API_URL = `http://localhost:${REST_PORT}`
const LOCAL_CLIENT_URL = `http://localhost:${CLIENT_PORT}`

const base = {
  REST_PORT,
  CLIENT_PORT,
  REST_API_URL,
  LOCAL_CLIENT_URL,
  corsOptions: {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: LOCAL_CLIENT_URL,
    preflightContinue: false,
  },
}

const test = deepmerge(base, {})
const local = deepmerge(base, {})

function determinConfig() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return test
    case 'dev':
      return local
    default:
      return base
  }
}

const config = determinConfig()
export default config
