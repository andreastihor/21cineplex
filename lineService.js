const lineServer = require('./lineserver')
let constant = require('./constant')
const {GetAllSchedule, } = require('./service.js')

function cinemaList(event) {
  return   message(event,Object.keys(constant).toString().replace(/,/g,'\n'))
}

function movieList(event,location) {
  return   message(event,JSON.stringify(constant[location]).replace(/,/g,'\n\n').replace(/"/g,'').replace(/{/g,'').replace(/}/g,'\n\n').replace(/[\[\]']+/g,''))
}

function message(event,message) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: message,
  });
}

async function resetMovie() {
  const response = await GetAllSchedule()
  constant = response
  setInterval(async function()
  {  const response = await GetAllSchedule()
    constant = response
  }, 86400000 )
}

module.exports = {
  cinemaList,
  message,
  movieList,
  resetMovie,

}
