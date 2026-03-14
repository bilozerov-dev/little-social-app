import Image from "next/image";
import { ImageType } from "../types/Image";

export interface GalleryProps {
  images: ImageType[];
}

export default function Gallery({ images }: GalleryProps) {
  return images.map((item, idx) => {
    return (
      <div
        key={idx}
        className="rounded-xl"
        style={{
          overflow: "hidden",
          position: "relative",
          aspectRatio: `${item.width}/${item.height}`,
        }}
      >
        <Image
          src={item.src}
          fill
          style={{
            objectFit: "cover",
          }}
          alt="Masonry item"
        />
      </div>
    );
  });
}
