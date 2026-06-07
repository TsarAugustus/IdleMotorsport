/* eslint-disable no-undef */
const http = require('node:http');
const path = require('path');

const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
	
});
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
