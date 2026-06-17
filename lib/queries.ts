import { db } from "@/lib/db"
import { series, chapters } from "@/lib/db/schema"
import { asc, desc, eq } from "drizzle-orm"
import { cache } from "react"

export const getSeriesBySection = cache(async (section: string) => {
  return db
    .select()
    .from(series)
    .where(eq(series.section, section))
    .orderBy(asc(series.sortOrder), desc(series.createdAt))
})

export const getAllSeries = cache(async () => {
  return db.select().from(series).orderBy(asc(series.sortOrder))
})

export const getSeriesBySlug = cache(async (slug: string) => {
  const rows = await db.select().from(series).where(eq(series.slug, slug)).limit(1)
  return rows[0] ?? null
})

export const getChaptersForSeries = cache(async (seriesId: number) => {
  return db
    .select()
    .from(chapters)
    .where(eq(chapters.seriesId, seriesId))
    .orderBy(asc(chapters.number))
})
