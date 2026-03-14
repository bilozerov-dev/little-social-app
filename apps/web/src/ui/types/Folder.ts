/* eslint-disable no-unused-vars */
import { ImageType } from "./Image";

export type FolderBase = {
  title: string;
  description: string;
  id: string;
  type: FolderType;
};

export type Folder = GalleryFolder | NotesFolder;

export type NotesFolder = FolderBase & {
  type: FolderType.Notes;
  notes: string[];
};
export type GalleryFolder = FolderBase & {
  type: FolderType.Gallery;
  images: ImageType[];
};

export enum FolderType {
  Gallery = "gallery",
  Notes = "notes",
}
