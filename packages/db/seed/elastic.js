import { Client } from '@elastic/elasticsearch'
import fs from 'fs'

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200'
export const client = new Client({ node: elasticUrl })

export async function createIndex(index) {
  try {
    await client.indices.create({ index })
    console.log(`Created index ${index}`)
  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`)
    console.error(err)
  }
}

export async function setMapping(index, type, schema) {
  try {
    await client.indices.putMapping({
      index,
      type,
      include_type_name: true,
      body: {
        properties: schema,
      },
    })

    console.log('Created successfully')
  } catch (err) {
    console.error('An error occurred while setting the mapping:')
    console.error(err)
  }
}

export async function bulkUpload(indexName, typeName, filePath) {
  const data = fs.readFileSync(filePath, 'utf-8')
  const jsonData = JSON.parse(data)

  console.log(jsonData)

  let bulkBody = []

  jsonData.forEach((item) => {
    bulkBody.push({
      index: {
        _index: indexName,
        _type: typeName,
      },
    })
    bulkBody.push(item)
  })

  console.log(bulkBody)

  const { body: bulkResponse } = await client.bulk({ refresh: true, body: bulkBody })

  if (bulkResponse.errors) {
    const erroredDocuments = []
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1],
        })
      }
    })
    console.log(erroredDocuments)
  } else {
    console.log(`Successfully imported ${jsonData.length} documents`)
  }
}
