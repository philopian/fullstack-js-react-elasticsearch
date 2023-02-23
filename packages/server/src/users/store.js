import prisma from '../utils/prisma'

export async function createUser({ name, email, password }) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    return user
  } catch (error) {
    console.log('[Error] user NOT created', error)
  }
}

export async function getUser(id) {
  const users = await prisma.user.findFirst({
    where: { id },
  })
  return users
}

export async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

export async function updateUser({ id, name, email, password }) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password },
    })
    return user
  } catch (error) {
    console.log('[Error] no user to update', error)
  }
}

export async function deleteUser(id) {
  try {
    const user = await prisma.user.delete({
      where: { id },
    })
    return user
  } catch (error) {
    console.log('[Error] no user found', error)
  }
}
