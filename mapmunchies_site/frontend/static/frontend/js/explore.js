var info = [[]];
var pos = [];
for (var i = 0; i < info.length; i++) {
    pos.push(0);
}
var light = 0;
function nxt(r) {
    pos[r] += 1;
    if (pos[r]==info[r].length) {
        pos[r]=0;
    }
    document.getElementById("name" + r.toString()).innerHTML = info[r][pos[r]][1];
    document.getElementById("pfp" + r.toString()).src = info[r][pos[r]][2];
    document.getElementById("message" + r.toString()).innerHTML = info[r][pos[r]][3];
    document.getElementById("nxt" + r.toString()).innerHTML = "Next Story " + (pos[r]+1).toString() + "/" + info[r].length.toString();
}

function toggle() {
    light += 1;
    document.getElementById("aroundmap").innerHTML="<div id='mapid'></div>";
    create();
}

function create() {
    var myIcon = L.icon({
        iconUrl: 'https://images.vexels.com/media/users/3/185225/isolated/preview/cc21d796204923937547f509844f7eba-hamburger-icon-hamburger-by-vexels.png',
        iconSize: [50, 60],
        iconAnchor: [25, 30],
//

//
    })
    var mymap = L.map('mapid').setView([40.7, -74], 10);
    if (light%2==0) {
        L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieGlhb3BpZXMiLCJhIjoiY2tsZW4zcnk1MWxyaTJvcWVrb2ZuZWRjaSJ9.oehEvW7g2zi8R69mZhanrA", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieGlhb3BpZXMiLCJhIjoiY2tsZW4zcnk1MWxyaTJvcWVrb2ZuZWRjaSJ9.oehEvW7g2zi8R69mZhanrA'
        }).addTo(mymap);
    } else {
        L.tileLayer("https://api.mapbox.com/styles/v1/xiaopies/cklfbn8nn3l9217p29ksw65el/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieGlhb3BpZXMiLCJhIjoiY2tsZW4zcnk1MWxyaTJvcWVrb2ZuZWRjaSJ9.oehEvW7g2zi8R69mZhanrA", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        // id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        // accessToken: 'pk.eyJ1IjoieGlhb3BpZXMiLCJhIjoiY2tsZW4zcnk1MWxyaTJvcWVrb2ZuZWRjaSJ9.oehEvW7g2zi8R69mZhanrA'
        }).addTo(mymap);
    }

    /*markers*/
}

create();
