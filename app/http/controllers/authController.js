import User from '../../models/user.js'
import flash from 'express-flash'
import bcrypt from 'bcrypt'
function authController() {
    return {
        login(req, res) {
            res.render('auth/login')
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
    }
}

export default authController
