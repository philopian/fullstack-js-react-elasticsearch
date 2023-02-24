import { validatePasswords, generateSalt, hashPassword } from '../utils/passwords'
import prisma from '../utils/prisma'

function redacted(user) {
  const redactedUser = { ...user }
  if (redactedUser.password) delete redactedUser.password
  if (redactedUser.salt) delete redactedUser.salt

  return redactedUser
}

export async function createUser({ name, email, password }) {
  try {
    const plainTextPassword = password
    const salt = generateSalt()
    const hashed = hashPassword(plainTextPassword, salt)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        salt,
      },
    })
    return redacted(user)
  } catch (error) {
    console.log('[Error] user NOT created', error)
  }
}

export async function getUserById(id) {
  const user = await prisma.user.findFirst({
    where: { id },
  })
  return redacted(user)
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findFirst({
    where: { email },
  })
  return redacted(user)
}

export async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users.map((user) => redacted(user))
}

export async function updateUser({ id, name, email, password }) {
  try {
    const plainTextPassword = password
    const salt = generateSalt()
    const hashed = hashPassword(plainTextPassword, salt)
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password: hashed, salt },
    })
    return redacted(user)
  } catch (error) {
    console.log('[Error] no user to update', error)
  }
}

export async function deleteUser(id) {
  try {
    const user = await prisma.user.delete({
      where: { id },
    })
    return redacted(user)
  } catch (error) {
    console.log('[Error] no user found', error)
  }
}
