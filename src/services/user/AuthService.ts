import { compare } from "bcryptjs"
import prismaClient from "../../prisma"
import { sign } from 'jsonwebtoken'
import { AuthRequest } from "../../models/auth/AuthRequest"

class AuthService {
  private genericException() {
    throw new Error("User credentials may be incorrect!")
  }

  async executeAuth({ email, password }: AuthRequest) {

    const user = await prismaClient.user.findFirst({
      where: { email }
    })

    if (!user) {
      this.genericException()
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      this.genericException()
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    return {
      id: user.id,
      name: user.name,
      token: token
    }
  }

}

export { AuthService }