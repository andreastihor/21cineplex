let request = require('request')
const Promise = require('bluebird')
request = request.defaults({
  rejectUnauthorized: false,
  headers : {
  "Accept":" text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
"Accept-Encoding":" gzip, deflate, br",
"Accept-Language":" en-US,en;q=0.9",
"Connection":" keep-alive",
"Host":" 21cineplex.com",
"Referer":" https://21cineplex.com/theaters/daftar-bioskop-21-di-tangerang,35.htm",
"Sec-Fetch-Mode":" navigate",
"Sec-Fetch-Site":" same-origin",
"Sec-Fetch-User":" ?1",
"Upgrade-Insecure-Requests":" 1",
"User-Agent":" Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
}
})
const get = Promise.promisify(request.get)
const post = Promise.promisify(request.post)
const cheerio = require('cheerio')
const fs = require('fs')


module.exports.getRegion = async () => {
  const response = await get('https://21cineplex.com/theaters')
  const $ = cheerio.load(response.body)
  const $regions = $('.custom-select option')
  const regions = {}
  $($regions).each((idx,val) => {
    regions[($(val).text())] = ($(val).val())
  })
  return regions
}

module.exports.getCinemaList = async (regionLink) => {
  const response = await get(regionLink)
  const $ = cheerio.load(response.body)
  const cinemas  ={}
  const $cinemaList = $('.tg-c3ow a')
  $($cinemaList).each((idx,val) => {
    cinemas[($(val).text())] = ($(val).attr('href'))
  })
  return cinemas
}
