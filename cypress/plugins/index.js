const { getConfigurationByFile } = require('../config/getConfigurationByFile')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  const file = config.env.configFile
  on('file:preprocessor', cucumber())
  return getConfigurationByFile(file)
}
// From here we can call the Task to execute external libaries