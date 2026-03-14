import { PutObjectCommand } from "@aws-sdk/client-s3";
import storageClient from "@/lib/aws-s3/s3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import createErrorResponse from "@/utils/http/createErrorResponse";
import { PostFilesInput, PostFilesOutput } from "./types";
import { SIGNED_URL_EXPIRATION } from "@/lib/aws-s3/constants";

export async function POST(request: Request) {
  try {
    const { fileName, fileType }: PostFilesInput = await request.json();

    if (typeof fileName !== "string" || typeof fileType !== "string") {
      return createErrorResponse("Failed validation of required fields.");
    }

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(storageClient, uploadCommand, {
      expiresIn: SIGNED_URL_EXPIRATION,
    });
    const uploadUrlData: PostFilesOutput = { uploadUrl };

    return Response.json(uploadUrlData);
  } catch (error) {
    if (typeof error === "string") {
      return createErrorResponse(error);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("An unknown error occurred.");
  }
}
