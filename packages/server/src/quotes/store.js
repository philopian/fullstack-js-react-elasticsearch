import { createIndex, setMapping, checkConnection } from '../utils/elasticsearch.js'

const index = 'quotes'
const type = 'quotes'

export async function createQuoteIndex() {
  await createIndex(index)
  await setMapping(index)
}

export async function checkQuoteConnection() {
  const status = await checkConnection()
  return status
}
