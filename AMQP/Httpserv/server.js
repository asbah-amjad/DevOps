/*
    HttpServer: returns content of the file created by OBSE
*/

const http = require('http');
const fs = require('fs');

const result = function (req, res) {
    //file reading
    fs.readFile('./output/output.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.writeHead(200);
        res.end(data);
    })

}

const server = http.createServer(result);
server.listen(8080);