function Divider() {
  return (
    <div className="flex items-center justify-center gap-2 text-primary/70" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/60 to-primary/60" />
      <span className="text-xs tracking-widest">✦ ❖ ✦</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/60 to-primary/60" />
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-16 flex flex-col items-center gap-8">
      <button className="rounded-md pill-gradient glow-border px-10 py-3 text-base font-bold text-foreground text-glow transition-all hover:glow-border-strong">
        Hatırlatma
      </button>

      <div className="w-full max-w-2xl">
        <Divider />
        <p className="my-6 text-center text-lg font-semibold leading-relaxed text-foreground text-pretty">
          Siteyle alakalı herşeyden anında haberdar olmak için{" "}
          <span className="text-primary">Discord</span>,{" "}
          <span className="text-primary">Tiktok</span> veya{" "}
          <span className="text-primary">İnstagram</span> hesaplarımızı takip
          edebilirsiniz^^
        </p>
        <Divider />
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-3 pb-12">
        <h3 className="text-lg font-bold text-foreground text-glow">Discorda Katıl!</h3>
        <a
          href="#"
          className="flex w-full items-center justify-between gap-4 rounded-xl bg-card px-4 py-3 glow-border transition-all hover:glow-border-strong"
        >
          <span className="flex items-center gap-3">
            <img
              src="/ziwatoon-logo.png"
              alt="Ziwatoon"
              className="h-9 w-9 object-contain drop-shadow-[0_0_8px_oklch(0.78_0.14_210/0.7)]"
            />
            <span className="font-bold text-foreground">ZİWATOON</span>
          </span>
          <span className="rounded-md pill-gradient glow-border px-5 py-1.5 text-sm font-bold text-foreground">
            Katıl
          </span>
        </a>
      </div>
    </footer>
  )
}
