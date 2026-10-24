import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/types";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/Icons";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/packages?destination=${destination.slug}`}
      className="group relative overflow-hidden rounded-[28px] shadow-card transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={destination.image}
          alt={destination.alt}
          fill
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,21,32,0.95)] via-[rgba(4,21,32,0.35)] to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-white sm:p-7">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70">
          <MapPinIcon className="h-3.5 w-3.5" />
          <span>
            {destination.name}, {destination.country}
          </span>
        </div>
        <h3 className="font-serif text-3xl">{destination.name}</h3>
        <p className="text-sm text-white/80">{destination.shortDescription}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-sm">
          View packages
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
