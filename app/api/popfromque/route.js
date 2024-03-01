import { NextResponse } from "next/server";
import getSqsClient from "../../../utils/getSqsClient";
import { ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

export async function GET(req) {
    console.log("CALL TO POP");
    const sqsClient = await getSqsClient();

    const receiveCommand = new ReceiveMessageCommand({
        QueueUrl: process.env.ORDER_QUEUE_URL,
        MaxNumberOfMessages: 1, // Adjust based on how many messages you want to receive at once
        VisibilityTimeout: 30, // The duration (in seconds) that the received messages are hidden from subsequent retrieve requests after being retrieved by a ReceiveMessage request
        WaitTimeSeconds: 20 // The duration (in seconds) for which the call waits for a message to arrive in the queue before returning. If a message is available, the call returns sooner than WaitTimeSeconds.
    });

    try {
        const messages = await sqsClient.send(receiveCommand);

        if (messages.Messages && messages.Messages.length > 0) {
            const message = messages.Messages[0];
            const userId = JSON.parse(message.Body).userId;

            // DO SOMETHING WITH USERID

            const deleteCommand = new DeleteMessageCommand({
                QueueUrl: process.env.ORDER_QUEUE_URL,
                ReceiptHandle: message.ReceiptHandle
            });

            await sqsClient.send(deleteCommand);

            return NextResponse.json({ userId }, { status: 200 });
        } else {
            return NextResponse.json({ message: "que is empty" }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to process queue message..." }, { status: 500 });
    }
}