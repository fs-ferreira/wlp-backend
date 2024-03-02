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

  async executeSend(id: string) {
    const hasItems = await prismaClient.item.findMany({ where: { order_id: id } })

    if (!hasItems.length) {
      throw new Error("Order must have at least one item!")
    }

    const order = await prismaClient.order.update({
      where: { id }, data: { draft: false }
    })

    return order;
  }

  async executeList() {
    const orders = await prismaClient.order.findMany({
      where: { status: false, draft: false },
      orderBy: {
        created_at: 'desc'
      }
    })
    return orders;
  }

  async executeDetail(id: string) {
    const items = await prismaClient.item.findMany({
      where: { order_id: id },
      select: {
        id: true,
        amount: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true
          }
        },
      }
    })
    return items;
  }

  async executeClose(id: string) {
    const order = await prismaClient.order.update({
      where: { id }, data: { status: true }
    })

    return order;
  }


}

export { OrderService }