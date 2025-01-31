import homeController from '../app/http/controllers/homeController.js'
import authController from '../app/http/controllers/authController.js'
import cartController from '../app/http/controllers/customers/cartController.js'
import guest from '../app/http/middleware/guest.js'
import orderController from '../app/http/controllers/customers/orderController.js'
function initRoutes(app) {
    app.get('/', homeController().index)

    app.get('/login', guest, authController().login)

    app.post('/logout', authController().logout)

    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)

    app.post('/register', authController().postRegister)

    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)

    app.post('/orders', orderController().store)

    app.get('/customers/orders', orderController().index)
}

export default initRoutes
