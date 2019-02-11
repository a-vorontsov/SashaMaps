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
        radius: 3000,
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
            res.send({placesArray});
        }
    });
});
app.post('/directions/', async (req, res) => {
    const query = {
        origin: req.body.origin,
        destination: req.body.destination,
        units: "metric",
        mode: "walking",
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
                const decoded = decodeLine(element.overview_polyline.points);
                const routes = decoded.map(r => {return {latitude: r[0], longitude: r[1]}});
                directionsArray.push({
                    coordsArray: routes,
                });
            });
            res.send({directionsArray});
        }
    });
});
app.get('/types/', async (req, res) => {
    const types = [
        {
            type: "amusement_park",
            name: "Amusement Park"
        },
        {
            type: "art_gallery",
            name: "Art Gallery"
        },
        {
            type: "atm",
            name: "ATM"
        },
        {
            type: "aquarium",
            name: "Aquarium"
        },
        {
            type: "bar",
            name: "Bar"
        },
        {
            type: "cafe",
            name: "Cafe"
        },
        {
            type: "casino",
            name: "Casino"
        },
        {
            type: "jewelry_store",
            name: "Jewellery Store"
        },
        {
            type: "movie_theater",
            name: "Movie Theatre"
        },
        {
            type: "museum",
            name: "Museum"
        },
        {
            type: "night_club",
            name: "Night Club"
        },
        {
            type: "park",
            name: "Park"
        },
        {
            type: "restaurant",
            name: "Restaurant"
        },
        {
            type: "shopping_mall",
            name: "Shopping Mall"
        },
        {
            type: "spa",
            name: "Spa"
        },
        {
            type: "zoo",
            name: "Zoo"
        },
    ];
    res.send({types});
})
app.listen(port, "0.0.0.0", () => console.log(`App listening on port ${port}!`));
