const {Pool} = require('pg');

const connection = new Pool({
    connectionString: process.env.URL_CONNECTION_DB
})

module.exports = connection