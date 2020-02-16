// -------------------- udp client ----------------

// creating a client socket
const udp = require('dgram');
const client = udp.createSocket('udp4');
const readline = require('readline');

//server address and port
let serverAddress = 'localhost';
let serverPort = 2222;

const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('message> ');
rl.prompt();
rl.on('line', function (line) {
    if (line === "exit") rl.close();
    sendMessage(line);
    // rl.prompt();
}).on('close', function () {
    process.exit(0);
});


//receive message
client.on('message', function (msg, info) {
    console.log('echo message [%s] Received %d bytes from %s:%d \n', msg.toString(), msg.length, info.address, info.port);
    rl.prompt();
});

// //sending msg
function sendMessage(msg) {
    client.send(msg, serverPort, serverAddress, function (error) {
        if (error) {
            client.close();
            rl.close();
        } else {
            console.log(`send message [${msg}] to ${serverAddress}:${serverPort}`);
        }
    });
}