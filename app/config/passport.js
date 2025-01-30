import LocalStrategy from 'passport-local'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

function init(passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
            },
            async (email, password, done) => {
                // Check if email exists
                const user = await User.findOne({ email: email })

                if (!user) {
                    return done(null, false, { message: 'User does not exist with this email' })
                }

                try {
                    const match = await bcrypt.compare(password, user.password) // Use await to handle the promise properly
                    if (match) {
                        return done(null, user, { message: 'Logged in successfully' })
                    } else {
                        return done(null, false, { message: 'Wrong username or password' })
                    }
                } catch (error) {
                    return done(error, false, { message: 'Something went wrong' })
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id) // Using await to get user
            done(null, user) // If user is found, pass it to done
        } catch (err) {
            return done(err, false, { message: 'Something went wrong' }) // Handle error properly here as well
        }
    })
}

export default init
