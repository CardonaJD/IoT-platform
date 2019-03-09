'use strict'

const Sequelize = require('sequelize') // "definir tipo de datos del modelo"
const setupDatabase = require('../lib/db')

module.exports = function setupAgentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('agent', { // Crear base de datos agent es el nombre de la tabla
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hostname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    connected: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
