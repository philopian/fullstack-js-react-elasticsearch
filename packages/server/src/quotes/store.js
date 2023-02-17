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
export async function createQuote({ author, quote }) {
  const insertObject = {
    index,
    body: {
      author,
      quote,
    },
  }
  const response = await client.index(insertObject)

  return response.body
}

// Read a quote by ID
export async function readQuote(id) {
  const response = await client.get({
    index,
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

  return body.hits
}

// Update a quote
export async function updateQuote({ id, author, quote }) {
  const response = await client.update({
    index,
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
    index,
    id,
  })

  return response.body
}
