import { hash } from "bcryptjs"
import prismaClient from "../../prisma"
import { UserCreateRequest } from "../../models/user/UserCreateRequest"

class UserService {

  async executeCreate({ name, email, password }: UserCreateRequest) {

    if (!email) {
      throw new Error("Please provide a valid email!")
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email }
    })

    if (userAlreadyExists) {
      throw new Error("User already exists!")
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  }

  async executeDetail(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      }
    })
    return user;
  }

}

export { UserService }