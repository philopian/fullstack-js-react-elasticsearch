import { Client } from '@elastic/elasticsearch'

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200'
export const esclient = new Client({ node: elasticUrl })

export async function createIndex(index) {
  try {
    await esclient.indices.create({ index })
    console.log(`Created index ${index}`)
  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`)
    console.error(err)
  }
}

export async function setMapping(index) {
  try {
    const schema = {
      quote: { type: 'text' },
      author: { type: 'text' },
    }

    await esclient.indices.putMapping({
      index,
      type: index,
      include_type_name: true,
      body: {
        properties: schema,
      },
    })

    console.log('Quotes mapping created successfully')
  } catch (err) {
    console.error('An error occurred while setting the quotes mapping:')
    console.error(err)
  }
}

export function checkConnection() {
  return new Promise(async (resolve) => {
    console.log('Checking connection to ElasticSearch...')
    let isConnected = false
    while (!isConnected) {
      try {
        await esclient.cluster.health({})
        console.log('Successfully connected to ElasticSearch')

        isConnected = true
        // eslint-disable-next-line no-empty
      } catch (_) {}
    }
    resolve('Successfully connected to ElasticSearch')
  })
}
