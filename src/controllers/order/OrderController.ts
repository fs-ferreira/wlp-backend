import { Request, Response } from "express";
import { OrderService } from "../../services/order/OrderService";
import prismaClient from "../../prisma";


class OrderController {
  async handleCreate(req: Request, res: Response) {
    const { table, name } = req.body

    const order = await new OrderService().executeCreate({ table, name })

    return res.status(201).json(order)
  }

  async handleDelete(req: Request, res: Response) {
    const { id } = req.params

    await new OrderService().executeDelete(id)

    return res.status(204).send()
  }

  async handleAddItem(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body

    const item = await new OrderService().executeAddItem({ order_id, product_id, amount })

    return res.status(201).json(item)
  }

  async handleDeleteItem(req: Request, res: Response) {
    const { id } = req.params

    await new OrderService().executeDeleteItem(id)

    return res.status(204).send()
  }

  async handleSend(req: Request, res: Response) {
    const { id } = req.body
    const order = await new OrderService().executeSend(id)
    return res.json(order)
  }

  async handleList(req: Request, res: Response) {
    const orders = await new OrderService().executeList()
    return res.json(orders)
  }

  async handleDetail(req: Request, res: Response) {
    const { id } = req.params
    const order = await new OrderService().executeDetail(id)
    return res.json(order)
  }

  async handleClose(req: Request, res: Response) {
    const { id } = req.body
    const order = await new OrderService().executeClose(id)
    return res.json(order)
  }

}

export { OrderController }