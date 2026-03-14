"use client";

import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function Avatar({
  src,
  alt,
  width,
  height,
  className,
}: AvatarProps) {
  return (
    <Image
      src={src}
      className={className}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      style={{
        borderRadius: "100%",
        objectFit: "cover",
      }}
    />
  );
}
