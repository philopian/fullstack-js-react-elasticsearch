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

export async function getAllQuotes() {
  const { body } = await client.search({
    index,
    body: {
      query: {
        match_all: {},
      },
    },
  })

  console.log(body.hits.hits)
  return body.hits.hits
}
