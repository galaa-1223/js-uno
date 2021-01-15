
let express = require('express');
let application = express();
let server = require('http').Server(application);
let GameServiceFactory = require('./node_src/GameServiceFactory.js');
let GameServiceRepository = require('./node_src/GameServiceRepository.js');
// let UnitTest = require('./node_src/UnitTest.js');

//Perform unit tests on some required logic
// let unitTest = new UnitTest();

application.get('/', function(request, response){
    response.sendFile(__dirname + '/client/index.html');
});
application.use('/client', express.static(__dirname + '/client'));

//server.listen(3000);
server.listen(80);

console.log('============= Server started ===============');

let io = require('socket.io')(server, {});
let gameServiceRepository = new GameServiceRepository();
let gameServiceFactory = new GameServiceFactory();

io.sockets.on('connection', function(socket) {
    console.log('Socket connection');

    socket.on('create', function(room) {

        console.log('Join room: ' + room + ' socketId: ' + socket.id);
        socket.join(room);

        socket.emit('demo',function(){
            symbol: 247
        });

        let gameService = gameServiceRepository.findById(room);

        if(!gameService){
            gameService = gameServiceFactory.create("UNO", room);
            gameServiceRepository.insert(gameService);
        }
        socket.use(function(packet){
            gameService.handleAction(socket, packet[0], packet[1]);  

            // for (var socketid in io.sockets.sockets) {
            //     console.log(socketid);
            // }
            // Object.keys(io.sockets.sockets).forEach(function(id) {
            //     console.log("ID:",id)  // socketId
            // })
                      //console.log(gameService);
            //Object.keys(io.sockets.sockets).forEach(function(id) {
                var data = gameService.getClientResponseData(socket.id);
                if(data){
                    io.to(socket.id).emit('state', data);
                    //console.log(data);
                }
            //});
        });
    });
});



