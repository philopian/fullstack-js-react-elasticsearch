/**
 *
 * Call the db store functions
 * this file should NOT know what DB is under the hood
 *
 *
 *
 *
 *
 */
import { getAllQuotes } from './store.js'

export function getQuote(id) {}

export async function getQuotes() {
  return getAllQuotes()
}
