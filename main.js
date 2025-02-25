const publicVapidKey =
	'BOjF0wFJnEo2SZOA9RoA9gWHdFB7KTnRwLU9o0oLvsIDPgr9B4420en2UqD-ZNi_1MZ9EhShcslTLSFNNe0Pzcc'; // REPLACE_WITH_YOUR_KEY

// Check for service worker
if ('serviceWorker' in navigator) {
	send().catch((err) => console.error(err));
}

// {
// "subject": "mailto: <danielagbeni12@gmail.com>",
// "publicKey": "BOjF0wFJnEo2SZOA9RoA9gWHdFB7KTnRwLU9o0oLvsIDPgr9B4420en2UqD-ZNi_1MZ9EhShcslTLSFNNe0Pzcc",
// "privateKey": "YbjY3vglY4BPvM8DpKe2z_OCYLrfEHOB0wa81X_dNjo"
// }

// Register SW, Register Push, Send Push
async function send() {
	try {
		// Register Service Worker
		console.log('Registering service worker...');
		const register = await navigator.serviceWorker.register('./sw.js', {
			scope: '/',
		});
		console.log('Service Worker Registered...');

		// Register Push
		console.log('Registering Push...');
		const subscription = await register.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
		});
		console.log('Push Registered...');

		// Send Push Notification
		console.log('Sending Push...');
		await fetch('http://localhost:3000/subscribe', {
			method: 'POST',
			body: JSON.stringify(subscription),
			headers: {
				'content-type': 'application/json',
			},
		});
		console.log('Push Sent...');
	} catch (error) {
		console.error('Error:', error);
	}
}

function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
