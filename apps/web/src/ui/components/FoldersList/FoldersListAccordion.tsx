"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Folder, FolderType } from "@/ui/types/Folder";
import Gallery from "../Gallery";
import { Images, NotebookPenIcon } from "lucide-react";

type FoldersListAccordionProps = {
  folders: Folder[];
};

export default function FoldersListAccordion({
  folders,
}: FoldersListAccordionProps) {
  return (
    <div className="flex flex-col">
      <Accordion type="single" collapsible className="w-full">
        {folders.map((folder) => {
          const isGallery = folder.type === FolderType.Gallery;
          const isNotes = folder.type === FolderType.Notes;
          return (
            <AccordionItem key={folder.id} value={folder.id} className="mb-3 border-b border-foreground">
              <AccordionTrigger className="bg-transparent h-10 border-none">
                <span className="inline-flex items-end gap-3">
                  {isNotes && <NotebookPenIcon size={18} />}
                  {isGallery && <Images size={18} />}
                  {folder.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="py-4">
                {folder.type === FolderType.Gallery &&
                  folder.images.length > 0 && (
                    <Gallery images={folder.images} />
                  )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
