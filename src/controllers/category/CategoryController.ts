import { Request, Response } from "express";
import { CategoryService } from "../../services/category/CategoryService";


class CategoryController {
  async handleCreate(req: Request, res: Response) {
    const { name } = req.body;

    const category = await new CategoryService().executeCreate({ name });

    return res.status(201).json(category)
  }

  async handleList(req: Request, res: Response) {
    const categories = await new CategoryService().executeList();
    return res.json(categories)
  }

  async handleDelete(req: Request, res: Response) {
    await new CategoryService().executeDelete(req.params.id)
    return res.status(204).send();
  }

}

export { CategoryController }