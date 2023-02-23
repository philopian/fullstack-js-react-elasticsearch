import { mockDeep, mockReset } from 'jest-mock-extended'

import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '../../src/users/store.js'
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
  test('should create new user ', async () => {
    const user = {
      name: 'Rich',
      email: 'hello@prisma.io',
      password: '123456789',
    }

    prismaMock.user.create.mockResolvedValue({ ...user, id: 1 })

    await expect(createUser(user)).resolves.toEqual({ ...user, id: 1 })
  })

  test('should read a user ', async () => {
    const id = 1
    const user = {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: '123456789',
    }

    prisma.user.findFirst.mockResolvedValue(user)

    await expect(getUser(id)).resolves.toEqual(user)
  })

  test('should read all users ', async () => {
    const users = [
      {
        id: 1,
        name: 'Rich',
        email: 'one@prisma.io',
        password: '123456789',
      },
      {
        id: 2,
        name: 'Rich',
        email: 'two@prisma.io',
        password: '123456789',
      },
    ]

    prismaMock.user.findMany.mockResolvedValue(users)

    await expect(getAllUsers()).resolves.toEqual(users)
  })

  test('should update a users name ', async () => {
    const user = {
      id: 1,
      name: 'Rich Haines',
      email: 'hello@prisma.io',
      password: '123456789',
    }

    prismaMock.user.update.mockResolvedValue(user)

    await expect(updateUser(user)).resolves.toEqual({
      id: 1,
      name: 'Rich Haines',
      email: 'hello@prisma.io',
      password: '123456789',
    })
  })

  test('should delete a user ', async () => {
    const user = {
      id: 1,
      name: 'Rich Haines',
      email: 'hello@prisma.io',
      password: '123456789',
    }

    prismaMock.user.delete.mockResolvedValue(user)

    const id = 1
    await expect(deleteUser(id)).resolves.toEqual(user)
  })
})
