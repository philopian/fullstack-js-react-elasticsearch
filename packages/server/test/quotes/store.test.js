import {
  createQuote,
  readQuote,
  readAllQuotes,
  updateQuote,
  deleteQuote,
} from '../../src/quotes/store.js'

const indexName = 'mocked'

describe('quotes CRUD functions', () => {
  test('createQuote', async () => {
    const quote = { author: '123', quote: '123' }
    const { _id, _index, result } = await createQuote(quote)

    expect(_index).toEqual(indexName)
    expect(_id).toEqual('123456789')
    expect(result).toEqual('created')
  })

  test('readQuote', async () => {
    const { _id, _index, found, _source } = await readQuote('123456789')

    expect(_index).toEqual(indexName)
    expect(_id).toEqual('123456789')
    expect(found).toEqual(true)
    expect(_source).toEqual({ author: 'Someone Special', quote: 'this rocks' })
  })

  test('readAllQuotes', async () => {
    const response = await readAllQuotes()

    expect(response.length).toEqual(3)
  })

  test('updateQuote', async () => {
    const { _id, result } = await updateQuote('EW2oXYYBeJQqzgDkxFNV', {
      author: 'new guy',
      quote: 'yep',
    })

    expect(_id).toEqual('123456789')
    expect(result).toEqual('updated')
  })

  test('deleteQuote', async () => {
    const { _id, result } = await deleteQuote('EW2oXYYBeJQqzgDkxFNV')

    expect(_id).toEqual('123456789')
    expect(result).toEqual('deleted')
  })
})
