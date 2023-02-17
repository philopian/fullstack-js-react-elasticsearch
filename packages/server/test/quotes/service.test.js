import { addItem, getItem, getAllItems, updateItem, deleteItem } from '../../src/quotes/service.js'

const indexName = 'mocked'

describe('service: `quotes`', () => {
  test('addItem', async () => {
    const result = await addItem({ author: 'something', quote: 'new' })

    expect(result.hasOwnProperty('_id')).toEqual(true)
    expect(result.hasOwnProperty('_index')).toEqual(true)
    expect(result.hasOwnProperty('author')).toEqual(true)
    expect(result.hasOwnProperty('quote')).toEqual(true)
  })

  test('getItem', async () => {
    const id = '123456789'
    const result = await getItem(id)
    const { _id, _index, author, quote } = result

    expect(_id).toEqual(id)
    expect(_index).toEqual('mocked')
    expect(author).toEqual('Someone Special')
    expect(quote).toEqual('this rocks')
  })

  test('getAllItems', async () => {
    const result = await getAllItems()

    expect(result[0].hasOwnProperty('_id')).toEqual(true)
    expect(result[0].hasOwnProperty('_index')).toEqual(true)
    expect(result[0].hasOwnProperty('author')).toEqual(true)
    expect(result[0].hasOwnProperty('quote')).toEqual(true)
  })

  test('updateItem', async () => {
    const result = await updateItem({ author: 'really', quote: 'new' })

    expect(result.hasOwnProperty('_id')).toEqual(true)
    expect(result.hasOwnProperty('_index')).toEqual(true)
    expect(result.hasOwnProperty('author')).toEqual(true)
    expect(result.hasOwnProperty('quote')).toEqual(true)
  })

  test('deleteItem', async () => {
    const deleteResult = await deleteItem('123456789')
    const { _id, result } = deleteResult

    expect(_id).toEqual('123456789')
    expect(result).toEqual('deleted')
  })
})
