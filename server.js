require('dotenv').config();
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// CORS middleware
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	);
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails(
	'mailto:danielagbeni12@gmail.com',
	publicVapidKey,
	privateVapidKey,
);

app.post('/subscribe', (req, res) => {
	const subscription = req.body;
	res.status(201).json({});
	const payload = JSON.stringify({ title: 'Push Test' });

	webpush.sendNotification(subscription, payload).catch((error) => {
		console.error(error.stack);
	});
});
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.get('/main.js', (req, res) => {
	res.sendFile(__dirname + '/main.js');
});
app.get('/sw.js', (req, res) => {
	res.sendFile(__dirname + '/sw.js');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
