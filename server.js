import express from 'express'
const app = express()
import path from 'path'
import expressEjsLayouts from 'express-ejs-layouts'
import { fileURLToPath } from 'url'
import initRoutes from './routes/web.js'
import mongoose from 'mongoose'
import session from 'express-session'
import flash from 'express-flash'
import MongoDbStore from 'connect-mongo'
import { config as Conf } from 'dotenv'
import passport from 'passport'
import passportInit from './app/config/passport.js'
Conf()

// Database connection
const url = 'mongodb://localhost:27017/Pizza'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once('open', () => {
    console.log('✅ Database connected...')
})

connection.on('error', err => {
    console.log('❌ Error: ' + err)
})

// ✅ Corrected MongoDB session store
let mongoStore = MongoDbStore.create({
    mongoUrl: url, // ✅ Use `mongoUrl`
    collectionName: 'sessions',
})

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// Session configuration
app.use(
    session({
        secret: process.env.COOKIE_SECRET || 'secret', // ✅ Fallback for missing env variable
        resave: false,
        store: mongoStore,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
        },
    })
)

passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

const PORT = process.env.PORT || 4000

app.use(flash())
app.use(express.static('public'))
app.set('view engine', 'ejs')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(expressEjsLayouts)
app.set('views', path.join(__dirname, '/resources/views'))

initRoutes(app)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
})
