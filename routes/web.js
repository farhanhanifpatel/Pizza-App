import homeController from '../app/http/controllers/homeController.js'
import authController from '../app/http/controllers/authController.js'
import cartController from '../app/http/controllers/customers/cartController.js'
function initRoutes(app) {
    app.get('/', homeController().index)

    app.get('/login', authController().login)

    app.get('/register', authController().register)

    app.get('/cart', cartController().index)
}

export default initRoutes
