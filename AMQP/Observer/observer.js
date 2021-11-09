/*
    OBSE (Observer)
    . Subscribes for all messages within the network, therefore receiving from both
        my.o and my.i
    . Stores the messages into a file
*/
const rabbit = require('amqplib');
const QUEUE_NAME_3 = 'queue3';
const EXCHANGE_TYPE = 'topic';
const EXCHANGE_NAME = 'observer';
const KEY = 'my.i';

//created connection
connection = rabbit.connect('amqp://localhost');
connection.then(async (conn) => {
    //channel creation
    const channel = await conn.createChannel();
    //exchange creation
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    //queue creation
    await channel.assertQueue(QUEUE_NAME_3);
    //bindQueue method to bind observer to queue3 with the routing key
    channel.bindQueue(QUEUE_NAME_3, EXCHANGE_NAME, KEY);
    channel.consume(QUEUE_NAME_3, (m) => {
        const message = m.content.toString()
        console.log(message)
        channel.ack(m)
    })
})

