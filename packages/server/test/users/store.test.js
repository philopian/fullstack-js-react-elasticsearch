import { mockDeep, mockReset } from 'jest-mock-extended'

import {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../../src/users/store.js'
import prisma from '../../src/utils/prisma.js'

jest.mock('../../src/utils/prisma.js', () => ({
  __esModule: true,
  default: mockDeep(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma

describe('Store', () => {
  test('should CREATE new user ', async () => {
    const user = { name: 'Rich', email: 'hello@prisma.io' }

    prismaMock.user.create.mockResolvedValue({ ...user, id: '1' })

    const actual = await createUser({ ...user, password: '12345' })
    const expected = { ...user, id: '1' }
    expect(actual).toEqual(expected)
  })

  test('should READ a user via getUserById()', async () => {
    const id = '1'
    const user = { id, name: 'Rich', email: 'hello@prisma.io' }

    prisma.user.findFirst.mockResolvedValue(user)

    const actual = await getUserById(id)

    expect(id).toEqual(user.id)
    expect(actual).toEqual(user)
    expect(actual.hasOwnProperty('password')).toEqual(false)
    expect(actual.hasOwnProperty('salt')).toEqual(false)
    expect(actual.hasOwnProperty('id')).toEqual(true)
    expect(actual.hasOwnProperty('email')).toEqual(true)
  })

  test('should READ user via getUserByEmail()', async () => {
    const email = 'hello@email.com'
    const user = { id: '99', name: 'Rich', email }

    prisma.user.findFirst.mockResolvedValue(user)

    const actual = await getUserByEmail(email)

    expect(email).toEqual(user.email)
    expect(actual).toEqual(user)
    expect(actual.hasOwnProperty('password')).toEqual(false)
    expect(actual.hasOwnProperty('salt')).toEqual(false)
    expect(actual.hasOwnProperty('id')).toEqual(true)
    expect(actual.hasOwnProperty('email')).toEqual(true)
  })

  test('should READ ALL users ', async () => {
    const users = [
      { id: 1, name: 'Rich', email: 'one@prisma.io' },
      { id: 2, name: 'Rich', email: 'two@prisma.io' },
    ]

    prismaMock.user.findMany.mockResolvedValue(users)

    const actual = await getAllUsers()

    expect(actual).toEqual(users)
    expect(actual[0].hasOwnProperty('password')).toEqual(false)
    expect(actual[0].hasOwnProperty('salt')).toEqual(false)
    expect(actual[0].hasOwnProperty('id')).toEqual(true)
    expect(actual[0].hasOwnProperty('email')).toEqual(true)
  })

  test('should update a users name ', async () => {
    const user = {
      id: 1,
      name: 'Rich Haines',
      email: 'hello@prisma.io',
    }

    prismaMock.user.update.mockResolvedValue(user)

    const actual = await updateUser({ ...user, password: '1234' })
    expect(actual).toEqual(user)
    expect(actual.hasOwnProperty('password')).toEqual(false)
    expect(actual.hasOwnProperty('salt')).toEqual(false)
    expect(actual.hasOwnProperty('id')).toEqual(true)
    expect(actual.hasOwnProperty('email')).toEqual(true)
  })

  test('should delete a user ', async () => {
    const user = {
      id: 1,
      name: 'Rich Haines',
      email: 'hello@prisma.io',
    }

    prismaMock.user.delete.mockResolvedValue(user)

    const id = 1
    await expect(deleteUser(id)).resolves.toEqual(user)
  })
})
