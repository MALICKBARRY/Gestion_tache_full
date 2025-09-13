const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require ('cors');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Middleware pour lire le JSON
app.use(express.json());
app.use(helmet());

// Configuration CORS pour production
const corsOptions = {
  origin: true, // Accepte toutes les origines en production
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Middleware pour gérer les requêtes OPTIONS
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});

// Routes de test et santé
app.get('/', (req, res) => {
  res.json({ message: 'Backend Gestion Tâches - API Active', status: 'OK' });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'API fonctionne correctement!', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/taches', require('./routes/tacheRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Middleware gestion d'erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port http://localhost:${PORT}`));
