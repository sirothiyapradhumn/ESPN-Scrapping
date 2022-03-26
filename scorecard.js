
const request =  require("request");
const cheerio = require("cheerio");
const { safeStringify } = require("request/lib/helpers");

function getInfoFromScorecard(url){
    //console.log("from scorecard.js ", url);
    //we have a url of a scorecard, we want to get html of that scorecard
    request(url, cb);
}

function cb(err, res, body){
    if(err){
        console.log(err);
    }
    else {
        getMatchDetails(body);
    }
}

function getMatchDetails(html){
    //selecTool contains html of ith scorecard
    let selecTool = cheerio.load(html);

    //1. get venue
    //2. get date
    let desc = selecTool(".match-header-info.match-info-MATCH");
    //console.log(desc.text());
    //o/p -> result6th Match (N), Dubai (DSC), Sep 24 2020, Indian Premier League
    let descArr = desc.text().split(",");
    console.log(descArr);
    let dateOfMatch = descArr[2];
    let venueOfMatch = descArr[1]
    console.log(dateOfMatch);
    console.log(venueOfMatch);
    
    //3. get result
    let matchResEle = selecTool(".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text");
    console.log(matchResEle.text());

    //4. get team name
    let teamName = selecTool(".name-detail>.name-link");
    //console.log(teamName.text());

    let team1 = selecTool(teamName[0]).text();
    let team2 = selecTool(teamName[1]).text();

    console.log(team1);
    console.log(team2);

    //5. inning
    let allBatmenTable = selecTool(".table.batsman tbody");
    console.log(allBatmenTable.length);
    let htmlString = "";
    //console.log(allBatmenTable.text());
    for(let i = 0; i<allBatmenTable.length; i++){
        htmlString += selecTool(allBatmenTable[i]).html();

        let allRows = selecTool(allBatmenTable[i]).find("tr"); // data of batsmen + empty row;

        for(let i =0; i<allRows.length; i++){
            //check to see if any of the matches elements have the given className
            let row = selecTool(allRows[i]);
            let firstColmnOfRow = row.find("td")[0];
            if(selecTool(firstColmnOfRow).hasClass("batsman-cell")){
                //will be getting valid data
                // name | runs | balls | 4's | 6's | sr
            }
        }
    }
}

// visit every scorecard and get info
module.exports = {
    gifs:getInfoFromScorecard
}