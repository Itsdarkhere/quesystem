import { SendMessageCommand } from "@aws-sdk/client-sqs";
import getSqsClient from "../../../utils/getSqsClient";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ error: 'Fields not filled in the form...' }, { status: 400 });
        }

        const sqsClient = await getSqsClient();

        const command = new SendMessageCommand({
            QueueUrl: process.env.ORDER_QUEUE_URL,
            MessageGroupId: "123",
            MessageBody: JSON.stringify({ userId: userId })
        });

        const res = await sqsClient.send(command);

        // Check if a MessageId is present in the response to confirm message was sent
        if (res.MessageId) {
            console.log('Message sent. MessageId:', res.MessageId);
            return NextResponse.json({ msg: 'Added...' }, { status: 200 });
        } else {
            // No MessageId indicates a failure to send the message
            console.error('Failed to send message');
            return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}