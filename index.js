const express = require("express");

//** ENV file */
require("dotenv").config();

//** Third Party Middleware */
const bodyParser = require("body-parser");
const cors = require("cors");

//** MongoDB Import */
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0evig.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//** PORT */
const port = 6600;



//** Mother App */
const app = express();


//** Middle Ware */
const middleware = [
    express.static("public"),
    express.urlencoded({ extended: true }),
    express.json(),
    bodyParser.json(),
    cors(),
];
app.use(middleware);



//** Root Route */
app.get("/", (req, res) => {
    res.send("Hello World!");
});


// const claster = allEvents


//** MongoDB Set Up */
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    const volunteerCollection = client
        .db(`${process.env.DB_NAME}`)
        .collection(`${process.env.DB_COLLECTION}`);
    // perform actions on the collection object
    console.log("Fake Data Database Has Successfully Connected");

    //** POST --> Insert Data & Save Database (Fake Data) */
    app.post("/addVolunteer", (req, res) => {
        const newVolunteer = req.body;
        volunteerCollection.insertMany(newVolunteer)
        .then((result) => {
            console.log(result.insertedCount);
            res.send(result.insertedCount > 0)
        });
    });

    //** GET --> Show All Fake Data */
    app.get("/volunteers", (req, res) => {
        volunteerCollection.find({})
        .toArray((error, documents) => {
            res.send(documents)
        })
    })
});


//** MongoDB Set Up */
const clientEvents = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
clientEvents.connect((err) => {
    const volunteerCollection = clientEvents
        .db(`${process.env.DB_NAME}`)
        .collection(`${process.env.DB_COLLECTION2}`);
    // perform actions on the collection object
    console.log("Events Database Has Successfully Connected");

    //** POST --> Insert Data & Save Database (Events Data) */
    app.post("/addEvents", (req, res) => {
        const newEvents = req.body
        volunteerCollection.insertOne(newEvents)
        .then( result => {
            console.log(result.insertedCount);
            res.send(result.insertedCount > 0)
        })
    })

    //** GET --> Show All Events Data */
    app.get("/events", (req, res) => {
        const queryEmail = req.query.email
        volunteerCollection.find({email: queryEmail})
        .toArray((error, documents) => {
            res.send(documents)
        })
    })

});


//** MongoDB Set Up */
const clientAdmin = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
clientAdmin.connect((err) => {
    const volunteerCollection = clientAdmin
        .db(`${process.env.DB_NAME}`)
        .collection(`${process.env.DB_COLLECTION3}`);
    // perform actions on the collection object
    console.log("Admin All User Database Has Successfully Connected");

    //** POST --> Insert Data & Save Database (Events Data) */
    app.post("/allUser", (req, res) => {
        const newEvents = req.body
        volunteerCollection.insertOne(newEvents)
        .then( result => {
            console.log(result.insertedCount);
            res.send(result.insertedCount > 0)
        })
    })

    //** GET --> Show All Events Data */
    app.get("/users", (req, res) => {
        volunteerCollection.find({})
        .toArray((error, documents) => {
            res.send(documents)
        })
    })

});



//** App Listen */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});