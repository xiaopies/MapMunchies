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

  console.log("query from local db");
  queryDB(request, renderMarkers);
}

function renderMarkers(data){
  // data = JSON.parse(data)
  data = data.data
  console.log(data);
  for (i in data){
    let markerlocation = {"lat": data[i][1], "lng":data[i][2]}
    let marker = new google.maps.Marker({
      position: markerlocation,
      map : GLOBALS.map,

    });
    google.maps.event.addListener(marker, "click", () => {
      const name = data[i][0];
      const location = markerlocation ;
      GLOBALS.infoWindow.close();
      GLOBALS.infoWindow = new google.maps.InfoWindow({
        position: location,
        content: wrapInfoWindowText(name),
      });
      GLOBALS.infoWindow.open(GLOBALS.map);
    });

  }
}

/**
 * Send json data to server
 * @param {*} request
 * @param {function} callback
 */
function queryDB(request, callback){
  console.log(request);
  $.ajax({
    headers: { "X-CSRFToken": getCSRF() },
    type: "POST",
    url: "/nearbySearch",
    data: JSON.stringify(request),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      callback(data);
    },
    error: function (errMsg) {
        console.log(errMsg);
    }
  });

}
