function initMap() {
  // var long = 131.044;
  // var lat = -25.363;
  // Grab the lat and long fromt he HTML to them use in this function 
  let long = parseFloat(document.querySelector('#long').innerHTML);
  let lat = parseFloat(document.querySelector('#lat').innerHTML);
  var coordinates = {lat: lat, lng: long};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: coordinates
  });
  let marker = new google.maps.Marker({
    position: coordinates,
    map: map
  });
}

// module.exports = initMap
