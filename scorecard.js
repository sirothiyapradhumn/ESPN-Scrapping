
const request =  require("request");
const cheerio = require("cheerio");

function getInfoFromScorecard(url){
    console.log("from scorecard.js ", url);
    
}
// visit every scorecard and get info
module.exports = {
    gifs:getInfoFromScorecard
}