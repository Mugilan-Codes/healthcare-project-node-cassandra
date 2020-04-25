const express = require('express');
const app = express();

const initDB = require('./initDB');
initDB();

app.get('/', (req, res) => res.send('API Running...'));

// Define Routes
app.use('/api/health', require('./routes/api/health'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
