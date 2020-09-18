const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
app.use(express.json());
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.get('/api', function (req, res) {
// 	res.set('Content-Type', 'application/json');
// 	res.send('{"message":"Hello from the custom server!"}');
// });
const itemsRouter = require('../routes/items');
app.use('/api/items', itemsRouter);

app.get('*', function (response) {
	response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
