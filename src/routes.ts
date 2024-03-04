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

const userController = new UserController()
const authController = new AuthController()
const categoryController = new CategoryController()
const productController = new ProductController()
const orderInstance = new OrderController()

router.get('/me', authGuard, userController.handleDetail)
router.post('/user', userController.handleCreate)
router.post('/session', authController.handle)

router.get('/category', authGuard, categoryController.handleList)
router.post('/category', authGuard, categoryController.handleCreate)
router.delete('/category/:id', authGuard, categoryController.handleDelete)

router.get('/product', authGuard, productController.handleListByCategory)
router.post('/product', authGuard, upload.single('file'), productController.handleCreate)
router.delete('/product/:id', authGuard, productController.handleDelete)

router.get('/order', authGuard, orderInstance.handleList)
router.get('/order/:id', authGuard, orderInstance.handleDetail)
router.post('/order', authGuard, orderInstance.handleCreate)
router.put('/order/send', authGuard, orderInstance.handleSend)
router.put('/order/close', authGuard, orderInstance.handleClose)
router.delete('/order/:id', authGuard, orderInstance.handleDelete)
router.post('/order/item', authGuard, orderInstance.handleAddItem)
router.delete('/order/item/:id', authGuard, orderInstance.handleDeleteItem)


export { router };
