'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel) // Relación ninguno a muchos - Un agente peude tenener 0 o muchas metricas relacionadas con él
  MetricModel.belongsTo(AgentModel) // 1 metrica solo puede tener un agente

  await sequelize.authenticate() // Verifica que la BD esta bien configurada

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
