"use client"

import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SeriesCard } from "@/components/series-card"
import { SectionHeading } from "@/components/section-heading"
import type { Series } from "@/lib/db/schema"

export function TrendCarousel({ items }: { items: Series[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section id="trend" className="scroll-mt-32">
      <div className="flex items-center justify-between">
        <SectionHeading>Trend Seriler</SectionHeading>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Geri kaydır"
            className="flex h-8 w-9 items-center justify-center rounded-md bg-secondary text-foreground glow-border transition-all hover:glow-border-strong"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="İleri kaydır"
            className="flex h-8 w-9 items-center justify-center rounded-md bg-secondary text-foreground glow-border transition-all hover:glow-border-strong"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((serie) => (
          <SeriesCard key={serie.id} serie={serie} size="md" />
        ))}
      </div>
    </section>
  )
}
