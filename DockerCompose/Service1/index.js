const express = require('express');
const http = require('http')

const app = express();

app.get('/', (req, res) => {

  const str1 = "Hello from " + req.client.remoteAddress + ":" + req.client.remotePort
    + " to " + req.client.localAddress + ":" + req.client.localPort;

  http.get("http://service2:8002", response => {
    let str2 = '';
    response.on('data', (chunk) => {
      str2 += chunk;
    })
    response.on('end', () => {
      res.end(str1 + "\n" + str2);
    })
      .on("error", err => {
        console.log("error" + err.message)
      })
  })
});

app.listen(8001, () => console.log('Service 1 running on port 8001...'));
