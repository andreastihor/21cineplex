const lineController = require('./controller')


  function handleEvent (event) {
    if ((event.message.text).toLowerCase() === "cinemalist") {
      return lineController.cinemaList(event)
    }

    if ((event.message.text).toLowerCase().match("movie")) {
      const location = event.message.text.split('/')
      return lineController.movieList(event,location[1].trim())
    }

    return lineController.notFound(event)
  }


module.exports = handleEvent
