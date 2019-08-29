//Server looks for requested file locally and sends back the data
const net = require('net');
const server = net.createServer();
const fs = require('fs');
console.log('Server started!');
server.on('connection', (client) => {
  client.setEncoding('utf8');
  console.log('A client has connected!\nWaiting for client to request a file');
  client.on('data', (fileName) => {
    console.log(`Client wants ${fileName}`);
    fs.readFile(`./file/${fileName}`, (err, data) => {
      if (err) client.write(`Error code: ${err.code}\npath: ${err.path} either invalid or doesn't exist`);
      else client.write(data);
    });
  });
});
server.listen(3000);