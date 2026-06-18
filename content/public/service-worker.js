self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(retireOldServiceWorker());
});

async function retireOldServiceWorker() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((cacheName) => caches.delete(cacheName).catch(() => undefined))
  );

  await self.clients.claim();
  await self.registration.unregister();

  const windows = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  });

  await Promise.all(
    windows.map((client) => {
      if ('navigate' in client) {
        return client.navigate(client.url).catch(() => undefined);
      }
      return undefined;
    })
  );
}
