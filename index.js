const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
//we use request in order to use ajax with express
const request = require('request')

//we are getting request with our api (https://www.npmjs.com/package/request)
//creating a function called getResults, which will take a zipcode
// function getResults(zip) {
//     //creating a variable called data to eventually get all the farmers market data from the api
//     let data =
//         //the zipcode referenced above takes the zip entered and plugs it into the request.get
//         request.get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zip, function (err, response, body) {
//             //the data resulting from the request.get will now get parsed to look readable
//             let data = JSON.parse(body)
//             //output results from the request.get
//             return data.results[0]
//         })
//     //output results from the getResults function
//     return data
// }

//function getResults(zip) {
//    // or
//    // function getResults(lat, lng) {
//    $.ajax({
//        type: "GET",
//        contentType: "application/json; charset=utf-8",
//        // submit a get request to the restful service zipSearch or locSearch.
//        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
//        // or
//        // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
//        dataType: 'jsonp',
//        jsonpCallback: 'searchResultsHandler'
//    });
//}
//iterate through the JSON result object.
//function searchResultsHandler(searchResults) {
//    for (var key in searchresults) {
//        alert(key);
//        var results = searchresults[key];
//        for (var i = 0; i < results.length; i++) {
//            var result = results[i];
//            for (var key in result) {
//                //only do an alert on the first search result
//                if (i == 0) {
//                    alert(result[key]);
//                }
//            }
//        }
//    }
//}
app.engine('handlebars', hbs({
    defaultLayout: 'main'
}))


app.set('view engine', 'handlebars')

app.use(express.static('public'))

//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.render('home')
})

//'/submit' relates to the form action in home.handlebars and the results post to the submit page
app.post('/submit', (req, res) => {
    //creating a variable to pull from the name='fname' in home.handlebars
    let zipcode = req.body.fname
    //Because javascript is asynchronous, put the request inside the post
    request.get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zipcode, function (err, response, body) {
        //the data resulting from the request.get will now get parsed to look readable
        let data = JSON.parse(body)
        console.log(data)
        //output results from the request.get
        res.render('home', {
            zipcode: data.results
        })
    })
    //we are rendering the home.handlebars page
})

app.listen(2001, function () {
    console.log('listening')
})
