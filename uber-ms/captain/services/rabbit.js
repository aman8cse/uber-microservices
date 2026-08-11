import amqp from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()

let connection, channel;

async function connect() {
    try {
        connection = await amqp.connect(process.env.AMQP_URL);
        channel = await connection.createChannel();
        console.log("Connected to rabbitMQ");

    } catch (err) {
        console.log("Error connecting rabbitMQ", err.message)
    }
}

async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message);
    })
}

async function pulblishToQueue(queueName, data) {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data));
}

export { subscribeToQueue, pulblishToQueue, connect }