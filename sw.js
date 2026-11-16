const CACHE = "udlap-ewaste-v3";
const TILES = "udlap-tiles-v1";
const ASSETS = ["./", "./index.html", "./puntos.js", "./config.js", "./manifest.json", "./leaflet/leaflet.js", "./leaflet/leaflet.css", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== TILES).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

async function trim(cache, max) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "tile.openstreetmap.org") {
    // Mapas: usa lo guardado y guarda lo nuevo (máx. 400 teselas)
    e.respondWith(
      caches.open(TILES).then(async (c) => {
        const hit = await c.match(req);
        const net = fetch(req).then((r) => { c.put(req, r.clone()).then(() => trim(c, 400)); return r; }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }
  if (url.origin !== location.origin) return;
  // App: red primero (para ver actualizaciones), caché si no hay internet
  e.respondWith(
    fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then((h) => h || caches.match("./index.html")))
  );
});
