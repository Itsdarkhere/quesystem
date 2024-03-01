import { SQSClient } from "@aws-sdk/client-sqs";

let sqsClient = undefined;
export default async function getSqsClient() {
    if (sqsClient) {
        return sqsClient;
    }

    sqsClient = new SQSClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    })

    return sqsClient;
}