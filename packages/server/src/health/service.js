import { checkConnection } from './store.js'

export async function checkDBConnection() {
  const status = await checkConnection()
  return status
}
