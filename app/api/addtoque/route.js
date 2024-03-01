// import getSqsClient from "@/utils/getSqsClient";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { SQSClient } from "@aws-sdk/client-sqs";
import { NextResponse } from "next/server";

async function getSqsClient() {
    let sqsClient = null;

    sqsClient = new SQSClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    })

    return sqsClient;
}

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

    await sqsClient.send(command);
    return NextResponse.json({ msg: 'Added...' }, { status: 200 })
}