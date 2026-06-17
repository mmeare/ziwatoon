export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center rounded-md px-5 py-1.5 header-gradient glow-border">
      <h2 className="text-sm font-bold uppercase tracking-wide text-foreground text-glow">
        {children}
      </h2>
    </div>
  )
}
