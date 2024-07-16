// const shortid = require("shortid");
// // import { nanoid } from 'nanoid';
// const URL = require("../models/url.js");

// async function handlegenerateNewShortURL(req, res) {
//   const body = req.body;
//   console.log(body);
//   if (!body || !body.url) return res.status(400).json({ error: "url is required" });
// //   const shortID = shortid(8);

// const shortID = shortid.generate();
// // console.log(shortID);

//   await URL.create({
//     shortId: shortID,
//     redirectURL: body.url,
//     visitHistory: [],
//   });
//   // console.log(`id : ${shortID}`);
//   return res.json({ id: shortID });

// }

// module.exports = {
//   handlegenerateNewShortURL,
// };


const shortid = require("shortid");
const URL = require("../models/url.js");

async function handlegenerateNewShortURL(req, res) {
  const body = req.body;
  console.log('Request body:', body); // Log the request body to debug

  if (!body || !body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortId = shortid.generate(); // Ensure this is correctly called
  console.log('Generated shortID:', shortId); // Log the generated shortID


    await URL.create({
      shortId: shortId, // Ensure the field name matches your schema
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortId});

}

module.exports = {
  handlegenerateNewShortURL,
};
