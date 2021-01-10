let app = require('express')();
let http = require('http').Server(app);

let io = require('socket.io')(http);

let site = '/src/index.html';

app.get('/', (req, res) => {
    res.sendFile(__dirname + site);
})

http.listen(3000, () => {
    console.log('Socket connected...')
})
//
io.on('connection', (socket) => {
    io.emit('connections', Object.keys(io.sockets.sockets).length)
    // io.emit('connections', Object.keys(io.sockets.connected).length)

    socket.on('disconnect', () => {
        console.log('Disconnected io...');
    })

    // Get data
    socket.on('Created', (data) => {
        io.emit('Created', (data))
    })

    // Chat-message
    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data))
    })

    //
    socket.on('writing', (data) => {
        socket.broadcast.emit('writing', (data))
    })
    //
    socket.on('stopWriting', (data) => {
        socket.broadcast.emit('stopWriting', (data))
    })
    //
    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data))
    })

    //
    socket.on('leaved', (data) => {
        socket.broadcast.emit('leaved', (data))
    })

    //
})


// const { Socket } = require('dgram');

// let app = require('express')();
// let http = require('http').Server(app);

// app.get('/', (req, res) => {
//     res.send('<h1>Hello Socket.io</h1>');
// })

// http.listen(3000, () => {
//     console.log('Socket connected...')
// })

