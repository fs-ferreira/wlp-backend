import { ProdcutCreateRequest } from "../../models/product/ProductCreateRequest";
import prismaClient from "../../prisma";
const fs = require('fs')
const path = require('path');

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
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    return products;
  }

  async executeDelete(id: string) {
    const product = await prismaClient.product.findFirst({ where: { id } })
    if (!product) {
      throw new Error("Product not found!")
    }
    const imgPath = path.join(__dirname, '..', '..', '..', 'tmp', product.banner)
    try {
      fs.unlinkSync(imgPath);
    } catch (err) {
      console.error('Temp image delete failed!', err);
    }
    return await prismaClient.product.delete({ where: { id } })
  }
}

export { ProdcutService }