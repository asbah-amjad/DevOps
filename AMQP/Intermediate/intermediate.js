/*
    IMED (Intermediate)
    . Subscribes for messages from my.o
    . Publishes message to my.i
*/

const ampqplib = require("amqplib");

const exchange = 'topic_logs';
const key1 = 'my.o';
const key2 = 'my.i';

const intermediate = async () => {

    const connection = await ampqplib.connect('amqp://rabbitmq')
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'topic', { durable: true })
    const channelQueue = channel.assertQueue('', { exclusive: true })
    //binding of queue with key my.o
    channel.bindQueue(channelQueue.queue, exchange, key1)
    console.log('IMED start listening to topic', key1);

    channel.consume(channelQueue.queue, message => {
        if (message.content) {
            // for delay of 1 sec
            setTimeout(() => {
                const newMessage = `Got ${message.content}`
                channel.publish(exchange, key2, Buffer.from(newMessage));
                console.log('IMED Published message', newMessage);
            }, 1000);

        }

    }, { noAck: true })
}

setTimeout(() => { intermediate() }, 10000);