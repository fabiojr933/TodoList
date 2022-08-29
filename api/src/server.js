const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const bordyParser = require('body-parser');
const route = require('./routes');
env.config();
require('./database');
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bordyParser.json({ limit: '50mb' }));
app.use(bordyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use('/api/v1/', route);
app.listen(port, () => { console.log(`Server run dev ${port}`) });