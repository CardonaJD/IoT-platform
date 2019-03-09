'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./').default

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([{
    type: 'confirm',
    name: 'setup',
    message: 'This will destroy you database, are you sure?'
  }])

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse', // process.env variables de entorno
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(hadleFatalError)

  console.log('Successes')
  process.exit(0)

  function hadleFatalError (err) {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
  }
}

setup()
