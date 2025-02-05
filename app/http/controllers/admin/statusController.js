import order from '../../../models/order.js'

function statusController() {
    return {
        async update(req, res) {
            try {
                await order.updateOne({ _id: req.body.orderId }, { status: req.body.status })
                res.redirect('/admin/order')
            } catch (err) {
                console.error(err)
                res.redirect('/admin/order')
            }
        },
    }
}

export default statusController
