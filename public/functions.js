function initMap() {
    var long = document.querySelector("#hiddenlong");
    var lat = document.querySelector("#hiddenlat");
    console.log(lat)
    var coordinates = {
        lat: lat,
        lng: long
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: coordinates
    });
    var marker = new google.maps.Marker({
        position: coordinates,
        map: map
    });
}
