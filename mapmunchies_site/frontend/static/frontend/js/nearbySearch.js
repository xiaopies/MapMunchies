// GLOBALS.timer;
CONSTANTS.MINQUERYZOOM = 15;
function initNearbySearchEventListeners(){
    GLOBALS.map.addListener("idle", () => {
        start_nearbySearch();
        console.log("zoom: " + GLOBALS.map.getZoom());
    });
    GLOBALS.map.addListener("center_changed", () => {
        stoptimer();
    });
}
function stoptimer(){
    clearTimeout(GLOBALS.timer);
}

function start_nearbySearch() { //plots the nearby locations
    mapzoom = GLOBALS.map.getZoom()
    if (GLOBALS.service && mapzoom >= CONSTANTS.MINQUERYZOOM && (GLOBALS.pastZoom != mapzoom || GLOBALS.map.center != GLOBALS.pastCenter)) {
        GLOBALS.pastCenter = GLOBALS.map.center;
        GLOBALS.pastZoom = mapzoom;
        // good: start countdown till request
        stoptimer();
        timer = setTimeout(function() {
            nearbySearch();
          }, 500);
    }
}
function nearbySearch(){
  //do nearybySearch after 3 seconds
  let mapbounds = GLOBALS.map.getBounds();
  let ne = mapbounds.getNorthEast();
  let sw = mapbounds.getSouthWest();
  let center = GLOBALS.map.center;
  let request = {
    centerlat: center.lat(),
    centerlng:center.lng(),
    nelat:ne.lat(),
    nelon:ne.lng(),
    swlat:sw.lat(),
    swlon:sw.lng(),
  }
  let nelat = ne.lat();
  let nelon = ne.lng();
  let swlat = sw.lat();
  let swlon = sw.lng();
  console.log("query from local db");
  queryDB(request, renderMarkers);
}

function renderMarkers(data){
  data = JSON.parse(data)
  console.log(data);
}

/**
 * Send json data to server
 * @param {*} request
 * @param {function} callback
 */
function queryDB(request, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/nearbySearch", true);
  xhr.setRequestHeader('X_CSRFTOKEN', CONSTANTS.csrftoken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(request));
  console.log(xhr);
}
