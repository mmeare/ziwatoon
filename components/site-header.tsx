"use client"

import Link from "next/link"
import { Home, Menu, BookOpen, Search } from "lucide-react"

const NAV_ITEMS = [
  { label: "Ana Sayfa", icon: Home, href: "/" },
  { label: "Ziwa", icon: SwanIcon, href: "/" },
  { label: "Kategori", icon: Menu, href: "/" },
  { label: "Tüm Seriler", icon: BookOpen, href: "/tum-seriler" },
]

const PILLS = [
  { label: "Trend Seriler", href: "/#trend" },
  { label: "Ekibimize Katıl!", href: "#" },
  { label: "Discord", href: "#" },
]

function SwanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 19c0-5 3-9 8-9 0 0-2-2-2-4a3 3 0 0 1 6 0c0 4-2 7-6 9" />
      <path d="M5 19h11a4 4 0 0 0 0-8" />
    </svg>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 header-gradient">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-3">
        <div className="flex flex-wrap items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 flex-col items-center">
            <img
              src="/ziwatoon-logo.png"
              alt="Ziwatoon"
              className="h-10 w-10 object-contain drop-shadow-[0_0_10px_oklch(0.78_0.14_210/0.7)]"
            />
            <span className="font-serif text-[10px] italic text-foreground/80">Ziwatoon</span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col items-center gap-0.5 rounded-md px-2 py-1 transition-colors hover:bg-foreground/5 sm:px-3"
              >
                <Icon className="h-5 w-5 text-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-foreground sm:text-xs">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Search */}
          <form
            role="search"
            className="ml-auto flex min-w-[180px] flex-1 items-center gap-2 rounded-md bg-background/50 px-3 py-2 glow-border sm:max-w-xs"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              placeholder="Detaylı Ara..."
              aria-label="Seri ara"
              className="w-full bg-transparent text-sm italic text-foreground placeholder:text-foreground/60 focus:outline-none"
            />
            <Search className="h-4 w-4 shrink-0 text-foreground/70" aria-hidden="true" />
          </form>
        </div>

        {/* Pills row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pb-1 sm:justify-start sm:pl-24">
          {PILLS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-md bg-background/40 px-5 py-1.5 text-xs font-bold text-foreground glow-border transition-all hover:glow-border-strong"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
