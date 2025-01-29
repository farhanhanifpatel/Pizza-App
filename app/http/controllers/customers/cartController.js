function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
    }
}

export default cartController
