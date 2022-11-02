import express from 'express'
const app = express()

import User from './User/user.router.js';
import Product from './Products/product.route.js';
import Cart from './Cart/cart.route.js';
import Order from './Order/order.route.js'

app.use('/user', User);
app.use('/products', Product);
app.use('/cart', Cart);
app.use('/order', Order)



export default app;