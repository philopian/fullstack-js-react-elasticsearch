import { dirname } from 'path'
import { join } from 'path'
import { fileURLToPath } from 'url'
import YAML from 'yamljs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const base = YAML.load(join(__dirname, './spec.yml'))
const quotes = YAML.load(join(__dirname, './quotes/spec.yml'))
const quotesDef = YAML.load(join(__dirname, './quotes/def.yml'))
const health = YAML.load(join(__dirname, './health/spec.yml'))
const healthDef = YAML.load(join(__dirname, './health/def.yml'))

const swaggerSpecs = {
  ...base,
  paths: {
    ...health.paths,
    ...quotes.paths,
  },
  definitions: {
    ...healthDef.definitions,
    ...quotesDef.definitions,
  },
}

export default swaggerSpecs
