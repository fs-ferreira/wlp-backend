import prismaClient from "../../prisma"

interface UserCreateRequest {
  name: string,
  email: string,
  password: string
}

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

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  }

}

export { UserService }