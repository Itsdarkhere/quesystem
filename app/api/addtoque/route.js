import { SendMessageCommand } from "@aws-sdk/client-sqs";
import getSqsClient from "../../../utils/getSqsClient";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { userId } = await req.json();
    if (!userId) {
        return NextResponse.json({ error: 'Fields not filled in the form...' }, { status: 400 })
    }

    const sqsClient = await getSqsClient();

    // In a real app you should validate the payload before sending it to the
    const command = new SendMessageCommand({
        QueueUrl: process.env.ORDER_QUEUE_URL,
        MessageGroupId: "123",
        MessageBody: JSON.stringify({ userId: userId })
    });

    const res = await sqsClient.send(command);
    console.log('Message sent. MessageId:', res);
    return NextResponse.json({ msg: 'Added...' }, { status: 200 })
}