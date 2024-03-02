import { ItemRequest } from "../../models/order/ItemRequet";
import { OrderRequest } from "../../models/order/OrderRequest";
import prismaClient from "../../prisma";


class OrderService {
  async executeCreate(req: OrderRequest) {
    const order = await prismaClient.order.create({
      data: { ...req }
    })

    return order;
  }

  async executeDelete(id: string) {
    const order = await prismaClient.order.findFirst({ where: { id } })
    if (!order) {
      throw new Error("Order not found!")
    }
    return await prismaClient.order.delete({ where: { id } })
  }

  async executeAddItem(req: ItemRequest) {
    const item = await prismaClient.item.create({
      data: { ...req }
    })
    return item;
  }

  async executeDeleteItem(id: string) {
    const item = await prismaClient.item.findFirst({ where: { id } })
    if (!item) {
      throw new Error("Item not found!")
    }
    return await prismaClient.item.delete({ where: { id } })
  }

}

export { OrderService }