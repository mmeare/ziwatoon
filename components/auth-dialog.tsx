"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/auth-client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Mode = "sign-in" | "sign-up"

export function AuthDialog({
  open,
  onOpenChange,
  initialMode = "sign-in",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: Mode
}) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>(initialMode)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // keep dialog mode in sync when reopened with a different intent
  function handleOpenChange(next: boolean) {
    if (next) setMode(initialMode)
    onOpenChange(next)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === "sign-up") {
        const { error } = await signUp.email({ email, password, name })
        if (error) throw new Error(error.message || "Kayıt başarısız oldu.")
      } else {
        const { error } = await signIn.email({ email, password })
        if (error) throw new Error(error.message || "Giriş başarısız oldu.")
      }
      onOpenChange(false)
      setEmail("")
      setPassword("")
      setName("")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-0 bg-popover p-0 sm:max-w-md">
        <div className="glow-border-strong rounded-lg bg-popover p-6">
          <DialogHeader className="space-y-1">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center">
              <img
                src="/ziwatoon-logo.png"
                alt="Ziwatoon logosu"
                className="h-14 w-14 object-contain drop-shadow-[0_0_12px_oklch(0.78_0.14_210/0.7)]"
              />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-foreground text-glow">
              {mode === "sign-in" ? "Giriş Yap" : "Kayıt Ol"}
            </DialogTitle>
            <p className="text-center text-sm text-muted-foreground">
              {mode === "sign-in"
                ? "Hesabına giriş yaparak okumaya devam et."
                : "Ziwatoon ailesine katıl, serilerini takip et."}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {mode === "sign-up" && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name" className="text-foreground/90">
                  Kullanıcı Adı
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="ziwa_okuru"
                  className="border-border bg-input/60 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-foreground/90">
                E-posta
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ornek@eposta.com"
                className="border-border bg-input/60 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-foreground/90">
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="En az 8 karakter"
                className="border-border bg-input/60 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {error && (
              <p className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive-foreground">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-md pill-gradient glow-border px-4 py-2.5 text-sm font-bold text-foreground text-glow transition-all hover:glow-border-strong disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Lütfen bekleyin..."
                : mode === "sign-in"
                  ? "Giriş Yap"
                  : "Kayıt Ol"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "sign-in" ? (
              <>
                Hesabın yok mu?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("sign-up")
                    setError(null)
                  }}
                  className="font-semibold text-primary hover:underline"
                >
                  Kayıt ol
                </button>
              </>
            ) : (
              <>
                Hesabın var mı?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("sign-in")
                    setError(null)
                  }}
                  className="font-semibold text-primary hover:underline"
                >
                  Giriş yap
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
