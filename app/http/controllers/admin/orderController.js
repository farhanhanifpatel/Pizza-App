import Order from '../../../models/order.js'

function orderController() {
    return {
        async index(req, res) {
            try {
                const orders = await Order.find({ status: { $ne: 'completed' } }, null, {
                    sort: { createdAt: -1 },
                })
                    .populate('customerId', '-password')
                    .exec()
                console.log('🟢 Orders fetched from DB:', orders) // Debugging

                if (req.xhr) {
                    // console.log('----1', orders)
                    return res.json(orders)
                } else {
                    // console.log('----2', orders)
                    return res.render('admin/order', { orders })
                }
            } catch (err) {
                console.error(err)
                return res.status(500).send('Internal Server Error')
            }
        },
    }
}

export default orderController
