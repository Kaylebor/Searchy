const Promise = require('bluebird')
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const crawler = require('./controllers/crawler')
const router = express.Router()
const port = 4000

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

router.get('/api/search', function(req, res) {
    crawler.search(req.query.q, 10, 0).then(value => {
        res.send.bind(res)
        res.send([].concat.apply([], value))
    })
})

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/', router)

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, function() {
    console.log('Searchy server running on port ' + port)
})
