const service  = require('../service/report')
const constants = require('../service/constant')


module.exports.getRegion = async() => {
  if (Object.keys(constants.regions).length !== 0) {
    return Object.keys(constants.regions)
  }
  const response = await service.getRegion()
  constants.regions = response
  return Object.keys(response)
}

module.exports.getCinemaList = async (req,h) => {
  const {region} = req.query
  if (Object.keys(constants.cinemas).length !== 0) {
    return Object.keys(constants.cinemas[region])
  }
  if (Object.keys(constants.regions).length === 0) {
    await this.getRegion()
  }
  const regionLink = constants.regions[region]
  const response = await service.getCinemaList(regionLink)
  constants.cinemas = response
  return Object.keys(response)
}

module.exports.getMovieList = async (req,h) => {
  const {cinema} = req.query
  if(Object.keys(constants.cinemas).length === 0) {
    return "Please Choose Region First"
  }
  const cinemaLink = constants.cinemas[cinema]
  return await(service.getMovieList(cinemaLink))
}
