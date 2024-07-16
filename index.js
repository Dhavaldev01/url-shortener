    const express = require("express");
    const { connectToMongoDB } = require("./connect.js");

    const URL = require("./models/url.js");
    const urlRoute = require("./routes/url.js");
    // var bodyParser = require('body-parser')
    const app = express();
    const PORT = 3001;

    connectToMongoDB("mongodb://localhost:27017/short-url-1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }).then(() => {
    console.log("Conncet To MongoDB");
    });

    app.use(express.json());
    app.use("/url", urlRoute);
    app.get("/:shortId",async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
        shortId,
        },
        {
        $push:{
            visitHistory: {timestamp : Date.now()},
        },
        }
    );
    res.redirect(entry.redirectURL);
    });
    // app.use(bodyParser.json());

    app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));
