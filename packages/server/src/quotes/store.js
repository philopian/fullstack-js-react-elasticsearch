//

/**
 *
 * Interact with the DB directly, write the specific SQL & queries
 * DB specific syntax
 *
 *
 */
import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: 'http://localhost:9200' })

const index = 'quotes'

// Create a quote
export async function createQuote(quote) {
  const { id, author, quote } = quote

  const response = await client.index({
    index: 'quotes',
    id,
    body: {
      author,
      quote,
    },
  })

  return response.body
}

// Read a quote by ID
export async function readQuote(id) {
  const response = await client.get({
    index: 'quotes',
    id,
  })

  return response.body
}

// Read all quotes
export async function readAllQuotes() {
  const { body } = await client.search({
    index,
    body: {
      query: {
        match_all: {},
      },
    },
  })

  return body.hits.hits
}

// Update a quote
export async function updateQuote(id, quote) {
  const { author, quote } = quote

  const response = await client.update({
    index: 'quotes',
    id,
    body: {
      doc: {
        author,
        quote,
      },
    },
  })

  return response.body
}

// Delete a quote
export async function deleteQuote(id) {
  const response = await client.delete({
    index: 'quotes',
    id,
  })

  return response.body
}
