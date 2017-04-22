var tabletojson = require('tabletojson');
var json2csv = require('json2csv');
var fs = require('fs');

function getCFN(url, fileName) {
    console.log("Getting CFN from: ", url);

    var tablesAsJson = tabletojson.convertUrl(url).then(function (tablesAsJson) {
        var table = tablesAsJson[8];
        console.log("Table:\n", table);

        var fields = ['0', '1', '2', '3'];
        var csv = json2csv({ data: table, fields: fields })
        console.log("\nCSV Data:\n", csv);

        fs.appendFile(fileName + ".csv", csv);
    });
}

var urlTempl = 'http://www.cl-cactus.com/genres.asp?genres=Haworthia&LstColl={0}&page={1}&OrderBy=Number';
var collectors = [ /* http://www.cl-cactus.com/genres.asp?genres=Haworthia&OrderBy=Number */
    { "shortName": "MBB", "number": 594, "fullname": "Martin Bruce Bayer" },
    { "shortName": "ISI", "number": 449, "fullname": "International Succulent Introductions (previously International Succulent Institute)" },
    { "shortName": "GM", "number": 371, "fullname": "J. Gerhard Marx" }
];

/* Start for MBB */ 
var selectedCFN = collectors[0];
for (i = 0; i < 12; i++) { //MBB has 12 pages per 80 items
    var url = urlTempl.replace("{0}", selectedCFN.number).replace("{1}", i * 80);
    getCFN(url, selectedCFN.shortName);
}
