
const tmi = require('tmi.js');

const opts = {
        //identity:{ username: 'username',password: 'OAUTH' },
        channels: ['MckyTV','myth','gronkh']
};

const client = new tmi.client(opts);

client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);

//client.connect();
var msg = "World";
verify(msg);

function onMessageHandler(channel, tags, message, self){

        if(self){return;} //ignore self
        console.log(`${tags.username}: ${message}`);
}

function onConnectedHandler(addr, port){

        console.log(`* COnnected to ${addr}:${port}`);
}

function verify(msg){

        console.log(`Hello ${msg}`);
}
