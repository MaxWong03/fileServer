// clients can connect to the server via TCP and send a request for a file (by filename)
const net = require('net');
const readline = require('readline');
const conn = net.createConnection({
  host: '192.168.88.123',
  port: 3000
});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');
const png = require('pngjs').PNG;
const decodePng = require('./png');

conn.setEncoding('utf8');
conn.on('connect', () => {
  console.log('Connected to file server!\n');
  console.log('Enter the file name you would like to request 😏\n');
  rl.question('Filename: ', (fileName) => {
    conn.write(fileName);
    conn.on('data', (file) => {
      fs.writeFile(fileName,file, (err) => {
        if (err) console.log(err);
        console.log('Bye bye see you next time 🤟🏻');
        rl.close();
        conn.end();
      });
    });
  });
});