const indexName = 'mocked'

export const mockClient = {
  index: jest.fn().mockReturnValue({
    body: {
      _index: indexName,
      _type: '_doc',
      _id: '123456789',
      _version: 1,
      result: 'created',
      _shards: { total: 2, successful: 1, failed: 0 },
      _seq_no: 9,
      _primary_term: 1,
    },
  }),
  get: jest.fn().mockReturnValue({
    body: {
      _index: indexName,
      _type: '_doc',
      _id: '123456789',
      _version: 1,
      _seq_no: 0,
      _primary_term: 1,
      found: true,
      _source: { author: 'Someone Special', quote: 'this rocks' },
    },
  }),
  search: jest.fn().mockReturnValue({
    body: {
      took: 0,
      timed_out: false,
      _shards: { total: 1, successful: 1, skipped: 0, failed: 0 },
      hits: {
        total: { value: 132, relation: 'eq' },
        max_score: 1,
        hits: [
          {
            _index: indexName,
            _type: '_doc',
            _id: '1',
            _score: 1,
            _source: {
              author: 'some',
              quote: 'one',
            },
          },
          {
            _index: indexName,
            _type: '_doc',
            _id: '2',
            _score: 1,
            _source: {
              author: 'one',
              quote: 'two',
            },
          },
          {
            _index: indexName,
            _type: '_doc',
            _id: '3',
            _score: 1,
            _source: {
              author: 'rad',
              quote: 'three',
            },
          },
        ],
      },
    },
  }),

  update: jest.fn((params) => {
    // Simulate successful response from Elasticsearch
    return Promise.resolve({
      body: {
        _index: indexName,
        _type: '_doc',
        _id: '123456789',
        _version: 2,
        result: 'updated',
        _shards: { total: 2, successful: 1, failed: 0 },
        _seq_no: 3,
        _primary_term: 1,
        _source: { ...params.body.doc },
      },
    })
  }),

  // update: jest.fn().mockReturnValue({
  //   body: {
  //     _index: indexName,
  //     _type: '_doc',
  //     _id: '123456789',
  //     _version: 2,
  //     result: 'updated',
  //     _shards: { total: 2, successful: 1, failed: 0 },
  //     _seq_no: 3,
  //     _primary_term: 1,
  //   },
  // }),
  delete: jest.fn().mockReturnValue({
    body: {
      _index: indexName,
      _type: '_doc',
      _id: '123456789',
      _version: 3,
      result: 'deleted',
      _shards: { total: 2, successful: 1, failed: 0 },
      _seq_no: 4,
      _primary_term: 1,
    },
  }),
}

export class Client {
  constructor() {
    return mockClient
  }
}
