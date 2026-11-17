const C="gymflow-v2",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
const TIPS=["💧 Pense à bien t’hydrater aujourd’hui.","🥩 Protéines à chaque repas pour mieux récupérer.","😴 Une bonne nuit de sommeil = des muscles plus forts.","📈 Ajoute 1 rep ou 1 à 2 kg quand toutes tes séries sont propres.","🔥 Échauffe-toi avant ton premier exercice lourd."];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>{const n=fetch(e.request).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(e.request,y));return x}).catch(()=>r);return r||n}))});
self.addEventListener("periodicsync",e=>{if(e.tag==="tip")e.waitUntil(self.registration.showNotification("GymFlow 💪",{body:TIPS[Math.floor(Date.now()/864e5)%TIPS.length],icon:"icon-192.png",tag:"gymflow"}))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window"}).then(l=>l.length?l[0].focus():clients.openWindow("./")))});
