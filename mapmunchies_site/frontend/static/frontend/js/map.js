GLOBALS.map = null;
CONSTANTS.startingZoom = 15;
CONSTANTS.stuy= { lat: 40.7178149, lng: -74.0138422 };


async function start() { //google api loaded
  // get location
  getLocation();

}

function initMap(location){
  if (location){
    GLOBALS.UserPos = { lat: location.coords.latitude, lng: location.coords.longitude };
  }
  else{
    GLOBALS.UserPos = null;
  }

  if (GLOBALS.UserPos){
    GLOBALS.map = new google.maps.Map(document.getElementById("mapid"), {
      center: GLOBALS.UserPos,
      zoom: CONSTANTS.startingZoom,
    });
  }else{
    // default to stuy
    GLOBALS.map = new google.maps.Map(document.getElementById("mapid"), {
      center: CONSTANTS.stuy,
      zoom: CONSTANTS.startingZoom,
    });
  }
  // map is inited
  GLOBALS.service = new google.maps.places.PlacesService(GLOBALS.map);
  GLOBALS.GeoMarker = new GeolocationMarker(GLOBALS.map);


   // Create the initial InfoWindow.
   GLOBALS.infoWindow = new google.maps.InfoWindow({
    content: wrapInfoWindowText("Click the map to get Lat/Lng!"),
    position: GLOBALS.UserPos,
  });

  GLOBALS.infoWindow.open(GLOBALS.map);
  // Configure the click listener.
  GLOBALS.map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    GLOBALS.infoWindow.close();
    // Create a new InfoWindow.
    GLOBALS.infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    GLOBALS.infoWindow.setContent(
      wrapInfoWindowText(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2))
    );
    GLOBALS.infoWindow.open(GLOBALS.map);
  });
  initNearbySearchEventListeners(); //nearbySearch.js
}

function getLocation(){
  // to be used just initally to center the map on the user before geolocaton marker takes over
  const options = {
    enableHighAccuracy: true,
    timeout: 5000, // => default infinity // take as much time as you need
    maximumAge: 500,
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      initMap,
      function error(msg) {
        console.log(msg);
        initMap(null);
    }, options);
  }
  else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    initMap(null);
  }
}
