import { S3Client } from "@aws-sdk/client-s3";

// AWS credentials are picked up from the environment
const client = new S3Client({ region: process.env.AWS_REGION });

export default client;
