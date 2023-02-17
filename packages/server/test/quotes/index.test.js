import express, { Router } from 'express'
import request from 'supertest'

import router from '../../src/quotes/index.js'

const mockIndex = 'mocked'
const mockData = {
  getAllItems: [
    { id: 1, text: 'To be or not to be', author: 'William Shakespeare' },
    { id: 2, text: 'I have a dream', author: 'Martin Luther King Jr.' },
    { id: 3, text: 'Be the change you want to see in the world', author: 'Mahatma Gandhi' },
  ],
  getItem: {
    _id: '123456789',
    _index: mockIndex,
    author: 'Someone Special',
    quote: 'this rocks',
  },
  addItem: {
    _id: '123456789',
    _index: mockIndex,
    author: 'Someone Special',
    quote: 'this rocks',
  },
  updateItem: { _id: '123456789', _index: mockIndex, author: 'really', quote: 'new' },
  deleteItem: { _id: '123456789', result: 'deleted' },
}
jest.mock('../../src/quotes/service.js', () => {
  return {
    getAllItems: jest.fn().mockImplementation(() => mockData.getAllItems),
    getItem: jest.fn().mockImplementation(() => mockData.getItem),
    addItem: jest.fn().mockImplementation(() => mockData.addItem),
    updateItem: jest.fn((params) => {
      // Simulate successful response from Elasticsearch
      const payload = { ...params, _id: params.id, _index: mockIndex }
      delete payload._id
      return Promise.resolve(payload)
    }),
    deleteItem: jest.fn().mockImplementation(() => mockData.deleteItem),
  }
})

const app = express()
app.use(express.json())
app.use('/', router)

describe('Quotes Routes', () => {
  it('GET /', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockData.getAllItems)
  })
  it('GET /:id', async () => {
    const res = await request(app).get('/123456789')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockData.getItem)
  })
  it('POST /', async () => {
    const payload = {
      id: '123456789',
      author: 'mike',
      quote: 'yep',
    }
    const res = await request(app)
      .post('/')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockData.addItem)
  })
  it('PUT /:id', async () => {
    const payload = {
      id: '123456789',
      author: 'mike',
      quote: 'neeeeeeew',
    }
    const res = await request(app)
      .put('/')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ ...payload, _index: mockIndex })
  })
  it('DELETE /:id', async () => {
    const res = await request(app).delete('/123456789')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockData.deleteItem)
  })
})
