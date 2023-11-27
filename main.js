
const http = require("http");
const fs = require("fs");

const xml = require("fast-xml-parser");
const parser = new xml.XMLParser();
const builder = new xml.XMLBuilder();

const server = http.createServer((req, res) =>
{
    res.writeHead(200, {"Content-Type": "application/xml"});

    fs.readFile("data.xml", (err, data) =>
    {
        if(err !== null)
            console.log("Can`t read data.xml");

        const objs = parser.parse(data).indicators.res;
        var saveValue = null;
        for(var index = 0; index < objs.length; index++)
        {
            if(saveValue === null || objs[index].value < saveValue)
                saveValue = objs[index].value;
        }
        res.end("<data><min_value>" + saveValue + "</min_value></data>");
    });
});

server.listen(8080, () => console.log("Server running at port 8080"));
