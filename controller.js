const service = require('./lineService')

function cinemaList(event) {
  return service.cinemaList(event)
}

function notFound(event) {
  return service.message(event,`Command Not Found~`)
}


function movieList(event, location) {
  return service.movieList(event, location)
}

module.exports = {
  cinemaList,
  movieList,
  notFound
}
