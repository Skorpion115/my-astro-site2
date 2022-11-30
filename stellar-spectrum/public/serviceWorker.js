// Globe Variablen
 const assets = [
    "/",
    "/instrumentenkauf",
    "/honorar",
    "/leistungen",
    "/faq",
    "/download",
    "/impressum",
    "/main.js",
    "/js/app",
    "/js/jquery-3.6.1.min.js",
    "/klavierunterricht",
    "/keyboardunterricht",
    "/gitarrenunterricht",
    "/e-bassunterricht",
    "/e-gitarrenunterricht",
    "/banjounterricht",
    "/akkordeon-unterricht",
    "/saxophonunterricht",
    "/klarinettenunterricht",
    "/noten_lesen",
    "/intervalle",
    "/triads",
    "/function_theory",
]; 
const cacheTypes = ["main", "fonts", "image"];
const cacheVersion = "_v3";
//const cacheKey = "MyFancyCacheName_v1";


self.addEventListener("install", (event) => {
    // waitUntil - hält den SW in installing status etwas zu machen bevor Event abgeschlossen wird
    event.waitUntil(
        // Zugriff auf die Cache API im Browser um komplette Requests und Response zu speichern
        caches.open(cacheTypes[0] + cacheVersion).then((cache) =>
            {
                //Fügt alle Assets zum cache hinzu
                return cache.addAll(assets);
            })
        .then(self.skipWaiting())
    );
});

function putInCache(request, response) {
    Console.log(request, response);
}
    //let cacheKey = cacheTypes.includes(request.destination)
    //? request.destination
    //: "main";
    //caches.open(cacheKey + cacheVersion).then((cache) => {
        //cache.put(request, response);
    //})
//}
/*
async function cacheFirst(request) {
    let responseFromCache = await caches.match(request)
    if (responseFromCache) {
        return responseFromCache;
    }

    let responseFrameNetwork = await fetch(request);
    putInCache(request, responseFrameNetwork.clone());
    return responseFrameNetwork;
}

async function networkFirst(request) {
    try {
        const responseFrameNetwork = await fetch(request);
        putInCache(request, responseFrameNetwork.clone());
        return responseFrameNetwork;
    }   catch {
        const responseFromCache = await caches.match(request);
        if (responseFromCache) {
            return responseFromCache;
        }
    }
}

self.addEventListener("fetch", (event) => {
    //console.log (event.request);
    let response = "";
        switch (event.request.destination) {
            case "font":
                response = cacheFirst(event.request);
            break;
        case "image":
            response = cacheFirst(event.request);
            break;
            default:
                response = networkFirst(event.request);
    }
    event.respond.With(response);
});

// Aktivate SW
async function deleteOldCache() {
    // Welche Caches sollen erhalten bleiben
    let cacheKeepList = [];
    cacheTypes.forEach((element) => {
        cacheKeepList.push(element + cacheVersion);
    });

    // All caches werden ermittelt und gefiltert
    let keyList = await caches.keys();
    let cacheToDelete = keyList.filter((key) => !cacheKeepList.includes(key));

    // Löschen der Caches welche nicht benötigt werden
    return Promise.all(
       cacheToDelete.keys.map((key) => {
        if (!cacheAllowList.includes(key)) {
            return caches.delete(key);
        }
       }) 
    );
}

self.addEventListener("activate", (event) => {
    console.log("service worker aktivated");
    event.waitUntil(
        deleteOldCache().then(() => {
            //Damit alle Clients (Tabs im Browser) den aktivierten Service Worker nutzen
            // sonst erst nach erneutem Reload der Seite
            clients.claim();
        })
    );
});*/