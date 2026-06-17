"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, LogOut } from "lucide-react"
import { useSession, signOut } from "@/lib/auth-client"
import { AuthDialog } from "@/components/auth-dialog"

export function UserSidebar() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in")

  function openAuth(next: "sign-in" | "sign-up") {
    setMode(next)
    setDialogOpen(true)
  }

  async function handleSignOut() {
    await signOut()
    router.refresh()
  }

  const isAuthed = !!session?.user

  return (
    <>
      <aside className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card glow-border">
          {isAuthed ? (
            <span className="text-2xl font-bold text-primary text-glow">
              {session.user.name?.charAt(0).toUpperCase() ?? "?"}
            </span>
          ) : (
            <User className="h-10 w-10 text-foreground/70" aria-hidden="true" />
          )}
        </div>

        {isAuthed ? (
          <div className="flex w-full flex-col items-center gap-2">
            <p className="max-w-[8rem] truncate text-center text-sm font-semibold text-foreground text-glow">
              {session.user.name}
            </p>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-md pill-gradient glow-border px-4 py-1.5 text-xs font-bold text-foreground transition-all hover:glow-border-strong"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Çıkış Yap
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-2.5">
            <button
              onClick={() => openAuth("sign-in")}
              disabled={isPending}
              className="w-24 rounded-md pill-gradient glow-border px-3 py-1.5 text-xs font-bold text-foreground text-glow transition-all hover:glow-border-strong disabled:opacity-50"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => openAuth("sign-up")}
              disabled={isPending}
              className="w-24 rounded-md pill-gradient glow-border px-3 py-1.5 text-xs font-bold text-foreground text-glow transition-all hover:glow-border-strong disabled:opacity-50"
            >
              Kayıt ol
            </button>
          </div>
        )}
      </aside>

      <AuthDialog open={dialogOpen} onOpenChange={setDialogOpen} initialMode={mode} />
    </>
  )
}
