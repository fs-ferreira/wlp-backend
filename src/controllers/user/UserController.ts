import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";

class UserController {

  async handleCreate(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await new UserService()
      .executeCreate({ name, email, password })

    return res.json(user)
  }
}

export { UserController };
