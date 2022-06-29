const amqp = require("amqplib");



const message = {
    description: "Bu bir test mesajıdır.."
}

const data = require("./data.json");

const queueName = process.argv[2] || "jobsQueue";

rabbitmq_connection();

async function rabbitmq_connection() {

    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);

        data.forEach(element => {
            message.description = element.id;
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log("Gönderilen mesaj:", element.id);
        });

        //Ex2
        /*
        setInterval(()=>{
            message.description = new Date().getTime();
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log("Gönderilen mesaj:", message);
        },1000);
        */
        //Ex1
        //channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)));


    } catch (error) {
        console.log("Error", error);
    }


}