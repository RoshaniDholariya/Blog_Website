const express = require('express')
const articleRouter = require("./routes/articles.js")
const Article = require('./models/articles.js')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost:27017/blog')
app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)