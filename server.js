import express from 'express'
const app = express()
import ejs from 'ejs'
import path from 'path'
import expressEjsLayouts from 'express-ejs-layouts'
import { fileURLToPath } from 'url'

const PORT = process.env.PORT || 4000

app.use(express.static('public'))

app.set('view engine', 'ejs')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(expressEjsLayouts)

// app.set('views', path.join(__dirname, '/resources/views'))
app.set('views', path.join(__dirname, '/resources/views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cart', (req, res) => {
    res.render('customers/cart')
})

app.get('/login', (req, res) => {
    res.render('auth/login')
})

app.get('/register', (req, res) => {
    res.render('auth/register')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
