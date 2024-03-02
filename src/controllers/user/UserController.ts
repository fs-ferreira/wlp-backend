import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";

class UserController {

  async handleCreate(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await new UserService()
      .executeCreate({ name, email, password })

    return res.status(201).json(user)
  }

  async handleDetail(req: Request, res: Response) {
    const user = await new UserService()
      .executeDetail(req.user_id)

    return res.json(user)
  }

}

export { UserController };
