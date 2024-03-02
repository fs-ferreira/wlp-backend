import { Router } from "express";
import { UserController } from "./controllers/user/UserController";
import { AuthController } from "./controllers/user/AuthController";
import { authGuard } from "./middlewares/authGuard";
import { CategoryController } from "./controllers/category/CategoryController";
import { ProductController } from "./controllers/product/ProcutController";

import upoloadConfig from './config/multer'
import multer from "multer";
import { OrderController } from "./controllers/order/OrderController";

const router = Router();

const upload = multer(upoloadConfig.upload("./tmp"))

router.post('/user', new UserController().handleCreate)
router.post('/session', new AuthController().handle)
router.get('/me', authGuard, new UserController().handleDetail)

router.post('/category', authGuard, new CategoryController().handleCreate)
router.get('/category', authGuard, new CategoryController().handleList)
router.delete('/category/:id', authGuard, new CategoryController().handleDelete)

router.post('/product', authGuard, upload.single('file'), new ProductController().handleCreate)
router.get('/product', authGuard, new ProductController().handleListByCategory)

router.post('/order', authGuard, new OrderController().handleCreate)
router.delete('/order/:id', authGuard, new OrderController().handleDelete)
router.post('/order/item', authGuard, new OrderController().handleAddItem)
router.delete('/order/item/:id', authGuard, new OrderController().handleDeleteItem)


export { router };
