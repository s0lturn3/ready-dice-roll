const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

// Configuração e conexão com o banco de dados
const dbPath = 'server/db/ready-dice-roll.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar com SQLite:', err.message);
  }
  else {
    console.log('Conexão com SQLite estabelecida no caminho:', dbPath);
  }
});

// Função para criar usuário
const createUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const userGUID = uuidv4();
    const query = `INSERT INTO Usuario (Id, Username, Email, Senha, DtCriacao)
                   VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`;

    db.run(query, [userGUID, username, email, password], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: userGUID });
      }
    });
  });
};

// Função para buscar todos os usuários
const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Usuario`;

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


// Função para validar se usuário/e-mail existem na base
const validateUsernameEmail = (username_email) => {
  return new Promise((resolve, reject) => {
    const query = `
SELECT	Id,
        Email,
        Username

FROM 	  Usuario

WHERE	  Email = ? OR
        Username = ?`;

    db.all(query, [username_email, username_email], (err, rows) => {
      if (err)  reject(err);
      else      resolve(rows);
    });
  });
};




// Fechando a conexão (opcional)
const closeConnection = () => {
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar conexão com SQLite:', err.message);
    } else {
      console.log('Conexão com SQLite fechada.');
    }
  });
};

module.exports = {
  validateUsernameEmail,
  createUser,
  getUsers,
  closeConnection,
};
