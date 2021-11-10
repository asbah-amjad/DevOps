/*
    ORIG(Original)
     Publishes messages to "my.o"
*/

const ampqplib = require("amqplib");

const exchange = 'topic_logs';
const key = 'my.o'

const delay = time => {
    new Promise(res => setTimeout(res, time))
};

const original = async () => {
    const connection = await ampqplib.connect('amqp://rabbitmq')
    //channel creation
    const channel = await connection.createChannel();
    //exchange creation of type topic
    await channel.assertExchange(exchange, 'topic', { durable: true })

    for (let i = 1; i <= 3; i++) {
        let message = 'MSG_' + i;
        channel.publish(exchange, key, Buffer.from(message));
        console.log('Published message', message);
        await delay(3000); //delay of 3 second
    }

}

setTimeout(() => { original(); }, 10000);

