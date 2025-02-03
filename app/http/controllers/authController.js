import User from '../../models/user.js'
import flash from 'express-flash'
import bcrypt from 'bcrypt'
import passport from 'passport'
function authController() {
    const _getRedirectUrl = req => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }

    return {
        login(req, res) {
            res.render('auth/login')
        },

        postLogin(req, res, next) {
            const { email, password } = req.body
            let oldCart = req.session.cart

            if (!email || !password) {
                req.flash('error', 'All fields must be required')
                return res.redirect('/login')
            }

            passport.authenticate('local', (error, user, info) => {
                if (error) {
                    req.flash('error', info?.message || 'An unexpected error occurred')
                    return next(error)
                }
                if (!user) {
                    req.flash('error', info?.message || 'Invalid credentials')
                    return res.redirect('/login')
                }
                req.logIn(user, err => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },

        register(req, res) {
            res.render('auth/register')
        },

        async postRegister(req, res) {
            const { name, email, password } = req.body
            console.log(req.body)
            if (!name || !email || !password) {
                req.flash('error', 'All fields must be required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            //Check if email exists
            try {
                // Check if email exists
                const emailExists = await User.exists({ email: email })

                if (emailExists) {
                    req.flash('error', 'Email already registered')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }

                // Hash password
                const hashPassword = await bcrypt.hash(password, 10)

                // Create user profile
                const user = new User({
                    name: name,
                    email: email,
                    password: hashPassword,
                })

                await user.save()
                return res.redirect('/')
            } catch (err) {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            }
        },

        // logout(req, res, next) {
        //     req.logout()
        //     return res.redirect('/login')
        // },

        logout(req, res, next) {
            let oldCart = req.session.cart
            req.logout(err => {
                if (err) {
                    return next(err)
                }
                // req.session.destroy(() => {
                //     res.redirect('/login')
                // })
                req.session.cart = oldCart
                return res.redirect('/login')
            })
        },
    }
}

export default authController
