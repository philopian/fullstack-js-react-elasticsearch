import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(__dirname, '../../.env') })

export async function validatePasswords(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
  } catch (error) {
    console.log('[error]', " passwords don't match")
    return false
  }
}

export function generateSalt(factor = 12) {
  return bcrypt.genSaltSync(factor)
}

export function hashPassword(plainTextPassword, salt) {
  return bcrypt.hashSync(plainTextPassword, salt)
}
