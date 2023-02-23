/**
 *
 * Call the db store functions
 * this file should NOT know what DB is under the hood
 *
 *
 */
import { createQuote, readQuote, readAllQuotes, updateQuote, deleteQuote } from './store.js'

export async function addItem({ author, quote }) {
  const createResult = await createQuote({ author, quote })
  const { _id, result } = createResult

  if (result === 'created') {
    const readData = await readQuote(_id)
    return { _id: readData._id, _index: readData._index, ...readData._source }
  }
  return result
}

export async function getItem(id) {
  const { _id, _index, _source } = await readQuote(id)
  return { _id, _index, ..._source }
}

export async function getAllItems() {
  const result = await readAllQuotes()
  return result.hits.map(({ _id, _index, _source }) => ({ _id, _index, ..._source }))
}

export async function updateItem({ id, author, quote }) {
  const result = await updateQuote({ id, author, quote })
  const { _id, _index, _source } = result
  return { _id, _index, ..._source }
}

export async function deleteItem(id) {
  const { _id, result } = await deleteQuote(id)
  return { _id, result }
}
