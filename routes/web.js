import homeController from '../app/http/controllers/homeController.js'
import authController from '../app/http/controllers/authController.js'
import cartController from '../app/http/controllers/customers/cartController.js'
import guest from '../app/http/middleware/guest.js'
import orderController from '../app/http/controllers/customers/orderController.js'
import auth from '../app/http/middleware/auth.js'
import admin from '../app/http/middleware/admin.js'
import adminController from '../app/http/controllers/admin/orderController.js'
import statusController from '../app/http/controllers/admin/statusController.js'

function initRoutes(app) {
    app.get('/', homeController().index)

    app.get('/login', guest, authController().login)

    app.post('/logout', authController().logout)

    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)

    app.post('/register', authController().postRegister)

    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)

    app.post('/orders', auth, orderController().store)

    app.get('/customers/orders', auth, orderController().index)

    app.get('/customers/orders/:id', auth, orderController().show)

    app.get('/admin/order', admin, adminController().index)

    app.post('/admin/order/status', admin, statusController().update)
}

export default initRoutes
