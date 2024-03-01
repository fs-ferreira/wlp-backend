import { Router } from "express";
import { UserController } from "./controllers/user/UserController";

const router = Router();

router.post('/users', new UserController().handleCreate)

export { router };
