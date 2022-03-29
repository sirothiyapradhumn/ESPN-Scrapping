let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const fs = require("fs");
const path = require("path");
const request =  require("request");
const cheerio = require("cheerio");
const allMatchObj = require("./allMatch");

request(url, cb);

function cb(err, res, body){
    if(err){
        console.error("error", err);
    } else {
        handleHTML(body);
    }
}

let iplPath = path.join(__dirname,"IPL");
//console.log(iplPath);   //F:\ESPN Scrapper
if(!fs.existsSync(iplPath)){
    fs.mkdirSync(iplPath);
}

function handleHTML(html){
    let selecTool = cheerio.load(html);
    let anchorElem = selecTool('a[data-hover="View All Results"]');
    //console.log(anchorElem.html());   o/p -> View All Results

    // attr() -> metthod forr getting all attributes and there values
    let relativeLink = anchorElem.attr("href");
    //console.log(relativeLink);  -> /series/ipl-2020-21-1210595/match-results
    let fullLink = "https://www.espncricinfo.com" + relativeLink;
    //console.log(fullLink);  ->https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results

    allMatchObj.getAllMatch(fullLink);
    
}


