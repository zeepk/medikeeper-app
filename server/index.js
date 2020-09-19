const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: './config/config.env' });
app.use(express.json());
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.use('*', express.static('../client/build'));
app.use(express.static(path.resolve(__dirname, '../client/build')));

const itemsRouter = require('../routes/items');
app.use('/api/items', itemsRouter);
app.get('*', (req, res) =>
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
);
// app.get('*', function (response) {
// 	response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
