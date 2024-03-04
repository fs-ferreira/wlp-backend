import { Request, Response } from "express";
import { AuthService } from "../../services/user/AuthService";

class AuthController {

  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const auth = await new AuthService().executeAuth({
      email,
      password
    })

    return res.json(auth)
  }

}

export { AuthController }