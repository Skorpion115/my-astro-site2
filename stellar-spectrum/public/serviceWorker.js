// Globe Variablen
const assets = [
  "/",
  "/instrumentenkauf/",
  "/honorar/",
  "/leistungen/",
  "/faq/",
  "/download/",
  "/impressum/",
  "/klavierunterricht/",
  "/keyboardunterricht/",
  "/gitarrenunterricht/",
  "/e-bassunterricht/",
  "/e-gitarrenunterricht/",
  "/banjounterricht/",
  "/akkordeon-unterricht/",
  "/saxophonunterricht/",
  "/klarinettenunterricht/",
  "/noten_lesen/",
  "/intervalle/",
  "/triads/",
  "/functional_theory/",
];
const cacheTypes = ["main", "fonts", "image"];
const cacheVersion = "_v3";
const cacheKey = "MyFancyCacheName_v1";

self.addEventListener("install", (event) => {
  // waitUntil - hält den SW in installing status etwas zu machen bevor Event abgeschlossen wird
  event.waitUntil(
    // Zugriff auf die Cache API im Browser um komplette Requests und Response zu speichern
    caches
      .open(cacheTypes[0] + cacheVersion)
      .then((cache) => {
        //Fügt alle Assets zum cache hinzu
        return cache.addAll(assets);
      })
      //.then(self.skipWaiting())
  );
});

function putInCache(request, response) {
  //Console.log(request, response);

  let cacheKey = cacheTypes.includes(request.destination)
    ? request.destination
    : "main";
  caches.open(cacheKey + cacheVersion).then((cache) => {
    cache.put(request, response);
  });
}

async function cacheFirst(request) {
    let responseFromCache = await caches.match(request);
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
    } catch {
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
