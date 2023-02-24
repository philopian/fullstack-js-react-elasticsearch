import bcrypt from 'bcrypt'

import { validatePasswords, hashPassword, generateSalt } from '../../src/utils/passwords.js'

describe('validatePasswords()', () => {
  it('should return true for a valid password', async () => {
    const password = 'password'
    const hashedPassword = await bcrypt.hash(password, 10)
    const isValid = await validatePasswords(password, hashedPassword)
    expect(isValid).toBe(true)
  })

  it('should return false for an invalid password', async () => {
    const password = 'password'
    const hashedPassword = await bcrypt.hash('sdfasdf', 10)
    const isValid = await validatePasswords(password, hashedPassword)
    expect(isValid).toBe(false)
  })
})

describe('hashPassword()', () => {
  it('should return hashed password', async () => {
    const plainTextPassword = 'password'
    const salt = '$2b$04$p.hQjt5AXuT9S11bcGlrcu'
    const hashed = bcrypt.hashSync(plainTextPassword, salt)

    const actual = hashPassword('password', salt)
    expect(hashed).toBe(actual)
  })
})
describe('generateSalt()', () => {
  it('should return a whatever bcrypt.genSaltSync returns', () => {
    jest.spyOn(bcrypt, 'genSaltSync').mockReturnValue('...')
    const saltResult = generateSalt()
    expect(saltResult).toBe('...')
  })
})
