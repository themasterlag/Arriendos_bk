const { Client } = require('pg')


async function getConnection()
{
  const client = new Client({
    user: 'postgres',
    host: '10.250.9.42',
    database: 'arriendos',
    password: 'admin',
    port: 5432,
  });

  await client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  })

  return client;
}

module.exports = getConnection;

