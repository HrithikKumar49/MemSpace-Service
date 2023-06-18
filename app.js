const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require('./src/notes.routes');
const mongoose = require('mongoose');
const dbconfig = require('./db.config');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api',notesRoutes);

mongoose.connect(dbconfig.url);

app.listen(port, () => {
    console.log('Server is working');
});
