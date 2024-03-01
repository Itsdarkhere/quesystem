import getSqsClient from "../../../utils/getSqsClient";
import { GetQueueAttributesCommand } from "@aws-sdk/client-sqs";
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log("CALL TO GET QUEUE SIZE")
    const sqsClient = await getSqsClient();

    const attributesCommand = new GetQueueAttributesCommand({
        QueueUrl: process.env.ORDER_QUEUE_URL,
        AttributeNames: ['ApproximateNumberOfMessages']
    });

    try {
        const response = await sqsClient.send(attributesCommand);
        const queueSize = response.Attributes.ApproximateNumberOfMessages;
        console.log("attributes: ", response)

        return NextResponse.json({ queueSize }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving queue attributes:', error);
        return NextResponse.json({ error: 'Failed to retrieve queue size...' }, { status: 500 });
    }
}