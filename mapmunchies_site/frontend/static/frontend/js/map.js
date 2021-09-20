const GLOBALS = {
  map:null,
  stuy: { lat: 40.7178149, lng: -74.0138422 },
}
const CONSTANTS = {
  startingZoom : 15,
} 

async function start() { //google api loaded
  // get location 
  getLocation()
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
      center: GLOBALS.stuy,
      zoom: CONSTANTS.startingZoom,
    });
  }

}

function getLocation(){
  const options = {
    enableHighAccuracy: true,
    // timeout: 5000, // => default infinity // take as much time as you need
    maximumAge: 500,
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap, 
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