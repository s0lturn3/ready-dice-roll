const { Client } = require('pg');

// Configurações da base
const client = new Client({
  connectionString: 'postgresql://campaign_manager_user:j9KG0XBIH0eINFlRNscqGW0tafVIlXH7@dpg-ct5u70lds78s73bqbcq0-a.oregon-postgres.render.com/campaign_manager?ssl=true'
});

// Conecta ao banco
client.connect()
  .then(() => console.log('Conexão ao banco PostgreSQL bem-sucedida!'))
  .catch((err) => console.error('Erro ao conectar ao banco:', err));

module.exports = client; // Exporta o cliente para uso em outros arquivos
