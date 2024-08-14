// server.js
const app = require('./app');
const http = require('http');
const setupSocketIO = require('./socket/socket');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

setupSocketIO(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
