import Link from "next/link"
import type { Series } from "@/lib/db/schema"

const SIZE_CLASSES = {
  sm: "w-[clamp(7rem,14vw,9.5rem)]",
  md: "w-[clamp(8rem,16vw,11rem)]",
} as const

export function SeriesCard({
  serie,
  size = "md",
}: {
  serie: Series
  size?: keyof typeof SIZE_CLASSES
}) {
  return (
    <Link
      href={`/seri/${serie.slug}`}
      className="group block shrink-0 focus:outline-none"
      aria-label={serie.title}
    >
      <div
        className={`${SIZE_CLASSES[size]} aspect-[2/3] overflow-hidden rounded-xl bg-card glow-border transition-all duration-300 group-hover:glow-border-strong group-hover:-translate-y-1 group-focus-visible:glow-border-strong`}
      >
        <img
          src={serie.coverUrl || "/covers/default-cover.png"}
          alt={`${serie.title} kapağı`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <p className="mt-2 max-w-[11rem] truncate text-center text-xs font-medium text-foreground/80 transition-colors group-hover:text-primary">
        {serie.title}
      </p>
    </Link>
  )
}
