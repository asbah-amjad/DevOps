/*
    IMED (Intermediate)
    . Subscribes for messages from my.o
    . Publishes message to my.i
*/

const rabbit = require('amqplib');
const QUEUE_NAME_1 = 'queue1';

const QUEUE_NAME_2 = 'queue2';
const EXCHANGE_TYPE = 'topic';
const EXCHANGE_NAME = 'intermediate';
const KEY = 'my.i';

connection = rabbit.connect('amqp://localhost');
connection.then(async (conn) => {
    const channel = await conn.createChannel();
    //receives a message from topic my.o queue1
    channel.consume(QUEUE_NAME_1, (m) => {
        const message = m.content.toString()
        console.log(message)
        channel.ack(m)

        //wait for 1 sec
        setTimeout(async function () {

            await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
            //creation of new queue
            await channel.assertQueue(QUEUE_NAME_2);
            //bindQueue method to bind intermediate to queue2 with the routing key
            channel.bindQueue(QUEUE_NAME_2, EXCHANGE_NAME, KEY);
            channel.sendToQueue(QUEUE_NAME_2, Buffer.from("Got " + m));
            console.log("received")
        }, 1000);

    })
})