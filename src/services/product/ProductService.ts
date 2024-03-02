import { ProdcutCreateRequest } from "../../models/product/ProductCreateRequest";
import prismaClient from "../../prisma";


class ProdcutService {
  async executeCreate(req: ProdcutCreateRequest) {
    const product = await prismaClient.product.create({
      data: {
        ...req
      }
    })
    return product;
  }

  async executeListByCategory(category_id: string) {
    const products = await prismaClient.product.findMany({
      where: { category_id },
    })
    return products;

  }
}

export { ProdcutService }