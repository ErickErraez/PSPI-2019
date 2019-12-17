;
const app = require('./app/app');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

const server = http.createServer(app);

process.env.PORT = process.env.PORT || 3001;

server.listen(process.env.PORT, () => {
    console.log(`El servidor esta iniciado en el puerto: ${process.env.PORT}`)
});
const io = socketIo.listen(server);
const socket = require('./websockets');
socket.connect(io);





