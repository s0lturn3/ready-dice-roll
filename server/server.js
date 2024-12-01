const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../dist/campaign-manager/browser')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/campaign-manager/browser/index.html'));
});

const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});