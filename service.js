let request = require('request')
const cheerio = require('cheerio')
const Promise = require('bluebird')
const fs = require('fs')

request = request.defaults({
  headers : {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Referer': 'https://www.21cineplex.com/'
  }
})
const get = Promise.promisify(request.get)
const post = Promise.promisify(request.post)


async function GetAllSchedule() {
  console.log("Start...");
  const jar = request.jar()
  const regular = await getRegulerSchedule(jar)
  return regular
}

function parseDarkSchedule(elm) {
  console.log("Parsing dark Schedule...");
  let arr = []
  let $ = cheerio.load(elm)
  elm.map((idx,elm) => {
    let obj = {}
     let td = $(elm).find('td')
     let title = td[0]
     title = $(title).text()
     let watch = td[1]
     watch = $(watch).text().split(' ')
     watch.pop()
     obj[title] = watch
     arr.push(obj)
  })
  return arr
}

function parseLightSchedule(elm) {
  console.log("Parsing Light Schedule...");
  let arr = []
  let $ = cheerio.load(elm)
  elm.map((idx,elm) => {
    let obj = {}
     let td = $(elm).find('td')
     let title = td[0]
     title = $(title).text()
     let watch = td[1]
     watch = $(watch).text().split(' ')
     watch.pop()
     obj[title] = watch
     arr.push(obj)
  })
  return arr
}

async function getRegulerSchedule(jar) {
  console.log("Getting Regular Schedule");
  const URL = [
    'https://www.21cineplex.com/theater/bioskop-baywalk-pluit-xxi,343,JKTBAPL.htm',
    'https://www.21cineplex.com/theater/bioskop-daan-mogot-xxi,194,JKTDAMG.htm',
    'https://www.21cineplex.com/theater/bioskop-pluit-junction-xxi,264,JKTPLJU.htm',
    'https://www.21cineplex.com/theater/bioskop-puri-xxi,153,JKTPURI.htm',
    'https://www.21cineplex.com/theater/bioskop-taman-anggrek-xxi,15,JKTANGG.htm',
    'https://www.21cineplex.com/theater/bioskop-st-moritz-xxi,374,JKTSTMO.htm',
  ]

  let schedule = {}
  let arr = []
    for(let i=0, n=URL.length;i<n;i++){
    console.log(`Getting Reguler Schedule for ${URL[i]}`);
    const response = (await get(URL[i],{jar})).body
    let $ = cheerio.load(response)
    //get normal schedule
    let table = $('.table-theater-det')[0]
    const dark = $(table).find('.dark')
    const light = $(table).find('.light')
    let temp =await parseDarkSchedule(dark)
    let temp2 = await parseLightSchedule(light)

    const start = URL[i].indexOf('bioskop')
    const end = URL[i].indexOf("-",start+8)
    let bioskop = URL[i].substr(start+7,end-start).replace(/-/g,' ').trim()
    bioskop = fixName(bioskop)
    schedule[bioskop] = temp.concat(temp2)
  }
  console.log("Done Crawling");
  return schedule
}

function fixName(bioskop) {
  if (bioskop === "pluit juncti") {
    bioskop = bioskop+'on'
  }
  if (bioskop === "puri xxi,15") {
    bioskop = "puri"
  }
  if (bioskop === "taman anggre") {
    bioskop+='k'
  }
  return bioskop
}



module.exports = {GetAllSchedule}