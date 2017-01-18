const cheerio = require('cheerio')
const URL = require('url-parse')
const Promise = require('bluebird')
const request = require('request-promise')
const sites = [{
    'home': 'http://www.pantallaytactil.com',
    'url': 'http://www.pantallaytactil.com/index.php?Search=Buscar&keyword="query"&Itemid=70&option=com_virtuemart&page=shop.browse',
    'patterns': {
        'img': '.browseProductImage',
        'title': '.browseProductTitle a',
        'text': '.browseProductDescription div',
        'href': '.browseProductTitle a',
        'price': '.productPrice',
        'containers': '.browseProductContainer2',
    }
}]

export function search(query, querySize, offset) {
    var realQuery = query.replace(/ /g, "+")
    var answer = []
    var promises = []
    var ready = Promise.resolve(null)
    var results = new Promise((resolve, reject) => {
        for (let site of sites) {
            var promise = crawl(site.home, site.url.replace('"query"', realQuery), site.patterns)
            promises.push(promise)
            promise.then(value => {
              answer.push(value)
            })
        }
    })
    ready = Promise.all(promises).catch(err => {
        console.log(err)
    })
    return ready.then(() => {
        return answer
    })
}

function crawl(home, url, patterns) {
    var options = {
        uri: url,
        transform: body => {
            return cheerio.load(body)
        },
    }
    return request(options).then($ => {
        var answer = []
        $(patterns.containers).each((index, element) => {
            element = $(element)
            answer.push({
                'img': element.find(patterns.img).attr('src'),
                'title': element.find(patterns.title).text().trim(),
                'text': element.find(patterns.text).text().trim(),
                'href': (home + element.find(patterns.href).attr('href')),
                'price': element.find(patterns.price).text().trim(),
            })
        })
        return answer
    })
}
