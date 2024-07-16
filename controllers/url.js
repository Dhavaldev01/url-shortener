
const shortid = require("shortid");
const URL = require("../models/url.js");

async function handlegenerateNewShortURL(req, res) {
  const body = req.body;
  console.log('Request body:', body); 

  if (!body || !body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortId = shortid.generate(); 
  console.log('Generated shortID:', shortId); 
  
    await URL.create({
      shortId: shortId, 
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortId});
}

async function handleGetAnalytics(req , res){
  const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    if(!result || result == null ){
      return res.status(404).json({error : "URl is not found"});
    }
    return res.json({totalClicks : result.visitHistory.length,
      analytics : result.visitHistory
    });
}

module.exports = {
  handlegenerateNewShortURL,
  handleGetAnalytics
};
