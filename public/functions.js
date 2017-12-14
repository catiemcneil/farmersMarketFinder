let long = -77.0448487
let lat = 38.9104015

function initMap() {
    //    long = document.querySelector("#hiddenlong");
    //    lat = document.querySelector("#hiddenlat");
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

function marketInfo() {
    //create a variable for when we click on a market and then select all the markets
    let selectMarket = document.querySelectorAll(".marketId");
    //when you click on a market, it executes the following function (which we called queryMarket)
    selectMarket.onclick = queryMarket;
    //calling the new function querymarket
    function queryMarket() {
        request.get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + selectMarket.id, function (err, response, body) {
            //if the body has is present, then the function will run, if nothing is in the body, then nothing will run and no error will occur
            if (body) {
                //the data resulting from the request.get will now get parsed to look readable
                let data = JSON.parse(body)
                console.log(data)
                // Pulling marketdetails from the resulting data from the request.get from the USDA API
                let marketdetails = data.marketdetails
                // Pull the google maps url from the marketdetails
                let url = marketdetails.GoogleLink
                // This splits a string at the = sign in the USDA API (based on a character) into an array. [1] is the second object in the array
                let coordinates = url.split('=')[1]
                // This splits the coorindates (^^^) at the characters %2C%20 and takes the first object in the array ([0])
                long = coordinates.split('%2C%20')[0]
                // This splits the coordinates at the characters %20 and takes the second object in the array
                // Since there are two %20 in the url, it gets the stuff between them
                lat = coordinates.split('%20')[1]
                console.log(long + " : " + lat)
                //output results from the request.get

                //initMap(lat,long);

                //            res.render('home', {
                //                marketdetails: marketdetails,
                //                lat: lat,
                //                long: long
                //            })
            }
        })
    }
}
