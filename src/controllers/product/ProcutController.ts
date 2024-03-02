import { Request, Response } from "express"
import { ProdcutService } from "../../services/product/ProductService"


class ProductController {
  async handleCreate(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    if (!req.file) {
      throw new Error("Error on file upload")
    }

    const { filename: banner } = req.file

    const product = await new ProdcutService().executeCreate({
      name, price, description, banner, category_id
    })

    return res.status(201).json(product)
  }

  async handleListByCategory(req: Request, res: Response) {
    const category_id = req.query.category_id as string;
    const products = await new ProdcutService().executeListByCategory(category_id)

    return res.json(products)
  }

}

export { ProductController }