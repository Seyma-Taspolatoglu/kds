require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { exec } = require('child_process');
const config = require('./src/config/config');
const errorHandler = require('./src/middleware/errorHandler');
const logger = require('./src/utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/players', require('./routes/players'));
app.use('/api/teams', require('./routes/teams'));

// HTML Routes
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error Handler
app.use(errorHandler);

const server = app.listen(config.port, () => {
    logger.info(`Server ${config.port} portunda çalışıyor`);
    if (process.platform === 'win32') {
        setTimeout(() => {
            exec('start http://localhost:' + config.port);
        }, 1000);
    }
});

process.on('unhandledRejection', (err) => {
    logger.error('Yakalanmamış Promise Reddi:', err);
    server.close(() => process.exit(1));
}); 