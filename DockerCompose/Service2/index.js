const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Hello from " + req.client.remoteAddress + ":" + req.client.remotePort
  + " to " + req.client.localAddress + ":" + req.client.localPort);
});

app.listen(8002, () => console.log('Service 2 running on port 8002...'));
