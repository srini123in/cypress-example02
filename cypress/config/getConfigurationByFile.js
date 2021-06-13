const fs = require('fs-extra')
const path = require('path')

const getConfigurationByFile = (file) => {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}
module.exports.getConfigurationByFile = getConfigurationByFile
