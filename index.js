const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const checker = (req, res, next) => {
  const { age } = req.query
  if (age) {
    return next()
  } else {
    return res.redirect('/')
  }
}

app.get('/', (req, res) => {
  res.render('age')
})

app.get('/major', checker, (req, res) => {
  const { age } = req.query
  res.render('maior', { age })
})

app.get('/minor', checker, (req, res) => {
  const { age } = req.query
  res.render('menor', { age })
})
app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
