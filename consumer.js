const amqp = require("amqplib");

rabbitmq_connection();

const queueName = process.argv[2] || "jobsQueue";
const data = require("./data.json");


async function rabbitmq_connection() {

    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);
        console.log("Mesaj bekleniyor");

        channel.consume(queueName, givenMessage => {
            const messageInfo = JSON.parse(givenMessage.content.toString());
            const userInfo = data.find(u => u.id == messageInfo.description);

            if(userInfo){
                console.log("İşlenen kayıt:", userInfo);
                channel.ack(givenMessage);
            }

          
        });

    } catch (error) {
        console.log("Error", error);
    }


}