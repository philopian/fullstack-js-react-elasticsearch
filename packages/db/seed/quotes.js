import { dirname } from 'path'
import { join } from 'path'
import { fileURLToPath } from 'url'

import { bulkUpload, createIndex, setMapping } from './elastic.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function run() {
  const index = 'quotes'
  const type = 'quotes'
  const schema = {
    quote: { type: 'text' },
    author: { type: 'text' },
  }
  const filePath = join(__dirname, './quotes.json')

  await createIndex(index)
  await setMapping(index, type, schema)
  await bulkUpload(index, type, filePath)
  console.log('DONE')
}

run()
