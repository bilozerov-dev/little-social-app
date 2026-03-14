export interface PostFilesInput {
  fileName: string;
  fileType: string;
}

export interface PostFilesOutput {
  uploadUrl: string;
  error?: string;
}
