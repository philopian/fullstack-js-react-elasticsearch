import { Client } from '@elastic/elasticsearch'

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200'
export const esclient = new Client({ node: elasticUrl })

export function checkConnection() {
  const TIME_OUT = 2000
  let timeCompleded = false

  return new Promise(async (resolve) => {
    console.log('...Checking connection to ElasticSearch')
    let isConnected = false

    setTimeout(() => (timeCompleded = true), TIME_OUT)

    while (!isConnected) {
      try {
        await esclient.cluster.health({})
        console.log('Successfully connected to ElasticSearch')
        isConnected = true
      } catch (_) {
        if (!isConnected && timeCompleded) resolve('NO DB connection')
      }
    }
    resolve('Successfully connected to ElasticSearch')
  })
}
