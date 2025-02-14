import Order from '../../../models/order.js';
import moment from 'moment';
function orderController() {
  return {
    store(req, res) {
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash('error', 'All fields are required');
        return res.redirect('/cart');
      }
      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });

      order
        .save()
        .then(async (result) => {
          const placeOrder = await Order.populate(result, {
            path: 'customerId',
          });
          req.flash('success', 'Successfully placed the order');
          delete req.session.cart;
          // Emit
          const eventEmitter = req.app.get('eventEmitter');
          eventEmitter.emit('orderPlaced', placeOrder);
          return res.redirect('/customers/orders');
        })
        .catch((err) => {
          req.flash('error', 'Something went wrong');
          return res.redirect('/cart');
        });
    },

    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.render('customers/orders', { orders: orders, moment: moment });
    },

    async show(req, res) {
      const order = await Order.findById(req.params.id);

      // Authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        console.log('Orders', { order });
        return res.render('customers/singleOrder', { order });
      }
      return res.redirect('/');
    },
  };
}

export default orderController;
