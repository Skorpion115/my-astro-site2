// Globe Variablen
const assets = [
    "/",
    "/instrumentenkauf/",
    "/honorar/",
    "/leistungen/",
    "/faq/",
    "/download/",
    "/impressum/",
    "/js/app.js",
];
const cacheTypes = ["main", "fonts", "image"];
const cacheVersion = "_v3";


self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheTypes[0] + cacheVersion).then(
            {
                // Fügt alle Assets dem Cache hinzu
                return:cache.addAll(assets),

        })
    )
});

function putInCache(request, response) {
    // Console.log(request, response);
    let cacheKey = cacheTypes.includes(request, destination)
    ? request.destination
    : "main";
    caches.open(cacheKey + cacheVersion).then((cache) => {
        cache.put(request, response);
    })
}

async function cacheFirst(request) {
    let responseFromCache = await caches.match(request)
    if (responseFromCache) {
        return responseFromCache;
    }
}

self.addEventListener("fetch", (event) => {});

self.addEventListener("activate", (event) => {});