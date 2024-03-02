import { response } from "express";
import { CategoryCreateRequest } from "../../models/category/CategoryCreateRequest"
import prismaClient from "../../prisma"

class CategoryService {
  async executeCreate({ name }: CategoryCreateRequest) {
    if (!name) {
      throw new Error("Please insert a name!")
    }

    const category = await prismaClient.category.create({
      data: {
        name
      },
      select: {
        id: true,
        name: true
      }
    })

    return category;
  }

  async executeList() {
    const categories = await prismaClient.category.findMany({
      select: { id: true, name: true }
    })
    return categories
  }

  async executeDelete(id: string) {
    const category = await prismaClient.category.findFirst({ where: { id } })
    if (!category) {
      throw new Error("Category not found!")
    }
    return await prismaClient.category.delete({ where: { id } })
  }
}

export { CategoryService }