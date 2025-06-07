const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('./bd');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());


const JWT_SECRET = process.env.JWT_SECRET 

// Registro continua igual
app.post('/register', async (req, res) => {
  try {
    const { full_name, email, username, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Erro no SELECT:', err);
        return res.status(500).json({ error: 'Erro no banco de dados' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Usuário já cadastrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `INSERT INTO users (full_name, email, username, password)
                   VALUES (?, ?, ?, ?)`;

      connection.query(sql,
        [full_name || null, email, username || null, hashedPassword],
        (err) => {
          if (err) {
            console.error('Erro no INSERT:', err);
            return res.status(500).json({ error: 'Erro ao salvar usuário' });
          }

          res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    });

  } catch (error) {
    console.error('Erro catch:', error);
    res.status(500).json({ error: 'Erro inesperado' });
  }
});

// Login com JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro no banco de dados' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }


    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    const formattedName = formatFirstName(user.name);
  res.json({
  message: 'Login bem-sucedido',
  token,
  name: formattedName, // ou user.name, dependendo do que tiver no seu banco
  email: user.email
});

  });
});

// Middleware para proteger rotas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = user; // adiciona info do usuário na requisição
    next();
  });
}

// Exemplo de rota protegida
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Rota protegida acessada!', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
