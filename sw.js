console.log('Service Worker Loaded...');

self.addEventListener('push', (e) => {
	const data = e.data.json();
	console.log('Push Received...');

	self.registration.showNotification(data.title, {
		body: data.body || 'Notification from HiMe Chat',
		icon: '/icon.png', // Add an icon file to your public folder
		badge: '/icon.png', // Add a badge file to your public folder
	});
});
