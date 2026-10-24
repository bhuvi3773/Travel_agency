"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  altBase: string;
}

export function Gallery({ images, altBase }: GalleryProps) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-soft">
        <Image
          src={images[active]}
          alt={`${altBase} — image ${active + 1}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={active === 0}
        />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={cx(
                "relative aspect-[4/3] overflow-hidden rounded-2xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]",
                index === active ? "ring-2 ring-[var(--brand-accent)] ring-offset-2" : "opacity-80 hover:opacity-100",
              )}
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1} for ${altBase}`}
              aria-pressed={index === active}
            >
              <Image
                src={image}
                alt={`${altBase} — thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 10vw, 25vw"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
