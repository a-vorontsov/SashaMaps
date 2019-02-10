const decodeLine = require('./test');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_PLACES_API_KEY
});
app.use(bodyParser.json());
app.post('/text_search/', async (req, res) => {
    const query = {
        location: [req.body.coords.lat, req.body.coords.lng],
        radius: 100,
        type: req.body.interest,
    };
    const placesArray = [];
    await googleMapsClient.placesNearby(query, async (error, response) => {
        if (error) {
           console.error(error); 
           res.send("404");
        } else {
            resultValues = response.json.results;
            await resultValues.forEach((element) => {
                placesArray.push({
                    location: element.geometry.location,
                    name: element.name,
                });
            });
            console.log(placesArray);
            res.send({placesArray});
        }
    });
});
app.post('/directions/', async (req, res) => {
    const query = {
        origin: req.body.origin,
        destination: req.body.destination,
        units: "metric",
        optimize: req.body.optimize,
    }
    await googleMapsClient.directions(query, async (error, response) => {
        const directionsArray = [];
        if (error) {
            console.error(error);
            res.send("404");
        } else {
            resultValues = response.json.routes;
            await resultValues.forEach((element) => {
                const decoded = decodeLine(element.overview_polyline.points)
                directionsArray.push({
                    coordsArray: decoded,
                });
            });
            console.log(directionsArray);
            res.send({directionsArray});
        }
    });
});
app.get('/types/', async (req, res) => {
    const types = ["amusement_park", "art_gallery", "atm", "aquarium", "bar", "cafe", "casino", "jewelry_store", "movie_theater", "museum", "night_club", "park", "restaurant", "shopping_mall", "spa", "zoo"];
    res.send({types});
})
app.listen(port, () => console.log(`App listening on port ${port}!`));