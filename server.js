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
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/taches', require('./routes/tacheRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));

// Middleware gestion d'erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port http://localhost:${PORT}`));
