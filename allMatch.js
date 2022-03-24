const request =  require("request");
const cheerio = require("cheerio");

// const getScorecardObj = require("./scorecard");  // same as below
const {gifs} = require("./scorecard");

function getAllMatch(url){
    //console.log("from allMatch.js ", url);
    request(url, cb);
}

function cb(err, res, body){
    if(err){
        console.error("error", err);
    } else {
        extractAllMatchLink(body);
    }
}

function extractAllMatchLink(html){
    let selecTool = cheerio.load(html);
    let scorecardElemArr = selecTool('a[data-hover="Scorecard"]');
    //console.log(scorecardElemArr.length); // o/p-> 60

    // attr() -> metthod forr getting all attributes and there values
    for(let i = 0; i<scorecardElemArr.length; i++){
        let scorecardLink = selecTool(scorecardElemArr[i]).attr("href");
        //console.log(i+") "+ scorecardLink); 
        // o/p -> www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard

        let fullLink = "https://www.espncricinfo.com" + scorecardLink;

        //getScorecardObj.gifs(fullLink);
        gifs(fullLink);
        break;
    }
}

module.exports = {
    getAllMatch: getAllMatch
};
