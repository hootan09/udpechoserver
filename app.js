// --------------------creating a udp server --------------------

// creating a udp server
const udp = require('dgram');
const server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

// emits on new datagram msg
server.on('message', function (msg, info) {
    console.log('message [%s] Received %d bytes from %s:%d', msg.toString(), msg.length, info.address, info.port);

    //sending msg
    server.send(msg, info.port, info.address, function (error) {
        if (error) {
            client.close();
        } else {
            console.log(`send echo back message [${msg.toString()}] to ${info.address}:${info.port}`);
        }

    });

});

//emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('======================================');
    console.log('|*|Server is listening at port' + port);
    console.log('|*|Server ip :' + ipaddr);
    console.log('|*|Server is IP4/IP6 : ' + family);
    console.log('======================================');
    console.log('\n')
});

//emits after the socket is closed using socket.close();
server.on('close', function () {
    console.log('Socket is closed !');
});

server.bind(2222);

// setTimeout(function () {
//     server.close();
// }, 8000);