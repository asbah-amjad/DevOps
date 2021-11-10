/*
    OBSE (Observer)
    . Subscribes for all messages within the network, therefore receiving from both
        my.o and my.i
    . Stores the messages into a file
*/
const ampqplib = require('amqplib');
const fs = require('fs');

const exchange = 'topic_logs';
const key = '#';

const observer = async () => {

    const connection = await ampqplib.connect('amqp://rabbitmq')
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'topic', { durable: true })
    const channelQueue = channel.assertQueue('', { exclusive: true })
    //queue binding with # key, to receive message from all topics
    channel.bindQueue(channelQueue.queue, exchange, key)

    channel.consume(channelQueue.queue, message => {
        if (message.content) {

            const newMessage = `${new Date().toISOString()} Topic ${message.fields.routingKey}: ${message.content}`;
            //writing to a file
            fs.appendFile('./output/output.txt', newMessage + '\n', (err) => {
                if (err) {
                    return console.log(err);
                }
                console.log(newMessage, ' written to the file');
            })

        }

    }, { noAck: true })
}

setTimeout(() => { observer() }, 10000);