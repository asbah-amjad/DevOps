/*
    ORIG(Original)
     Publishes messages to "my.o"
*/

const rabbit = require('amqplib');
const QUEUE_NAME_1 = 'queue1';
const EXCHANGE_TYPE = 'topic';
const EXCHANGE_NAME = 'original';
const KEY = 'my.o';
let i = 1;

//created connection
connection = rabbit.connect('amqp://localhost');
connection.then(async (conn) => {
    //channel creation
    const channel = await conn.createChannel();
    //exchange creation
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    //queue creation
    await channel.assertQueue(QUEUE_NAME_1);
    //bindQueue method to bind original to queue1 with the routing key
    channel.bindQueue(QUEUE_NAME_1, EXCHANGE_NAME, KEY);

    while (i <= 3) {
        channel.sendToQueue(QUEUE_NAME_1, Buffer.from("MSG_" + i));
        setTimeout(function () {
            console.log("Waiting")
        }, 3000);
        i++;
    }
})

