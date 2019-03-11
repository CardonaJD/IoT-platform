'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')
const defaults = require('defaults')
const setupAgent = require('./lib/agent')

module.exports = async function(config) {
    config = defaults(config, {
        dialect: 'sqlite',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        query: {
            raw: true
        }
    })

    const sequelize = setupDatabase(config)
    const AgentModel = setupAgentModel(config)
    const MetricModel = setupMetricModel(config)

    AgentModel.hasMany(MetricModel) // Relación ninguno a muchos - Un agente peude tenener 0 o muchas metricas relacionadas con él
    MetricModel.belongsTo(AgentModel) // 1 metrica solo puede tener un agente

    await sequelize.authenticate() // Verifica que la BD esta bien configurada

    if (config.setup) {
        await sequelize.sync({ force: true })
    }

    const Agent = setupAgent(AgentModel)
    const Metric = {}

    return {
        Agent,
        Metric
    }
}