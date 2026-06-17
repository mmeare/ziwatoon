import { SiteHeader } from "@/components/site-header"
import { UserSidebar } from "@/components/user-sidebar"
import { TrendCarousel } from "@/components/trend-carousel"
import { SectionHeading } from "@/components/section-heading"
import { SeriesCard } from "@/components/series-card"
import { SiteFooter } from "@/components/site-footer"
import { getSeriesBySection } from "@/lib/queries"

export default async function HomePage() {
  const [trend, kesfet, yeni, tamamlanmis] = await Promise.all([
    getSeriesBySection("trend"),
    getSeriesBySection("kesfet"),
    getSeriesBySection("yeni"),
    getSeriesBySection("tamamlanmis"),
  ])

  return (
    <div className="min-h-screen cosmic-bg">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="flex gap-4">
          {/* Left sidebar */}
          <div className="hidden w-24 shrink-0 pt-2 md:block">
            <div className="sticky top-32">
              <UserSidebar />
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Mobile sidebar */}
            <div className="mb-6 md:hidden">
              <UserSidebar />
            </div>

            <TrendCarousel items={trend} />

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[1fr_auto]">
              {/* Left column: Keşfet + Yeni Minnaklar */}
              <div className="flex flex-col gap-12">
                <section>
                  <SectionHeading>Keşfet</SectionHeading>
                  <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3">
                    {kesfet.map((serie) => (
                      <SeriesCard key={serie.id} serie={serie} />
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeading>Yeni Minnaklar</SectionHeading>
                  <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3">
                    {yeni.map((serie) => (
                      <SeriesCard key={serie.id} serie={serie} />
                    ))}
                  </div>
                </section>
              </div>

              {/* Right column: Tamamlanmış Seriler */}
              <section className="lg:w-[24rem]">
                <div className="flex justify-center lg:justify-end">
                  <SectionHeading>Tamamlanmış Seriler</SectionHeading>
                </div>
                <div className="rounded-xl border-2 border-foreground/70 p-4">
                  <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8">
                    {tamamlanmis.map((serie) => (
                      <SeriesCard key={serie.id} serie={serie} size="sm" />
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <SiteFooter />
          </div>
        </div>
      </main>
    </div>
  )
}
