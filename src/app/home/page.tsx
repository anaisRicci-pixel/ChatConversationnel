"use client";

import { useState } from "react";
import Image from "next/image";
import { AlignJustify, Plus, Mic, BookMarked } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "@/components/molecules/MobileNav";
import { DesktopNav } from "@/components/molecules/DesktopNav";
import { LLMSwitcher } from "@/components/atoms/LLMChip";
import {
  PINNED_ITEMS,
  RECENT_ITEMS,
  SUGGESTED_PROMPTS_MOBILE,
  SUGGESTED_PROMPTS_DESKTOP,
} from "@/lib/mock-data";

/* ─── Page ───────────────────────────────────────────────────────── */

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [llmMode, setLlmMode] = useState<"rapide" | "avancé">("rapide");

  return (
    <>
      {/* ══════════════════════════════════════════
          MOBILE  (hidden on md+)
      ══════════════════════════════════════════ */}
      <div className="md:hidden relative flex flex-col min-h-svh bg-blanc-lm overflow-hidden">
        {/* Gradient de fond */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-orange/[.08] via-orange/[.03] to-transparent"
        />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between p-3 shrink-0">
          <Sheet open={navOpen} onOpenChange={setNavOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Ouvrir le menu"
                className="bg-blanc-lm shadow-[0px_4px_16px_rgba(0,0,0,0.1)] rounded-r-sm flex items-center justify-center size-[35px]"
              >
                <AlignJustify size={16} className="text-title-lm" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 border-0 w-[calc(100%-40px)] max-w-[320px] [&>button:first-child]:hidden"
            >
              <MobileNav
                onClose={() => setNavOpen(false)}
                pinnedItems={PINNED_ITEMS}
                recentItems={RECENT_ITEMS}
              />
            </SheetContent>
          </Sheet>

          <span className="font-onest font-normal text-body text-title-lm">
            Secured <span className="font-semibold text-orange">ChatGPT</span>
          </span>

          <div className="border border-separateurs-lm rounded-full shadow-card overflow-hidden size-[40px] shrink-0">
            <Image src="/avatar.png" alt="Profil" width={40} height={40} className="object-cover size-full" />
          </div>
        </header>

        {/* Corps */}
        <main className="relative z-10 flex flex-col flex-1 items-center justify-end">
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="font-onest font-normal text-display-mobile text-title-lm text-center">
              Bonjour <span className="text-orange">Jeanne !</span>
            </p>
          </div>

          <div className="w-full flex flex-col gap-3 pb-3">
            {/* Prompts suggérés — scroll horizontal */}
            <div className="overflow-x-auto scrollbar-none h-[52px]">
              <div className="flex gap-2 px-3 h-full items-center w-max">
                {SUGGESTED_PROMPTS_MOBILE.map((text, i) => (
                  <button
                    key={i}
                    type="button"
                    className="backdrop-blur-[8px] bg-blanc-lm/50 flex flex-col items-start p-2 rounded-r-md shadow-[0px_5px_25px_rgba(0,0,0,0.05)] shrink-0 w-[126px] max-w-[165px] overflow-hidden"
                  >
                    <p className="text-caption-mobile text-gris-fonce-lm overflow-hidden text-ellipsis line-clamp-2 text-left font-inter font-normal">
                      {text}
                    </p>
                  </button>
                ))}
                <button type="button" className="flex items-center justify-center p-2 shrink-0 h-[52px]">
                  <span className="text-caption-mobile text-gris-fonce-lm w-[88px] text-left font-inter font-normal">
                    Ma bibliothèque de prompts
                  </span>
                </button>
              </div>
            </div>

            {/* Barre de prompt */}
            <div className="px-3">
              <div className="bg-blanc-lm border border-separateurs-lm rounded-r-lg shadow-[0px_5px_24px_rgba(0,0,0,0.1)] flex flex-col gap-6 px-4 pt-4 pb-3">
                <p className="px-2 text-caption-desktop text-gris-fonce-lm font-inter font-normal">
                  Que puis-je pour vous aujourd&apos;hui ?
                </p>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Options"
                    className="flex items-center justify-center p-2 rounded-r-sm size-[32px] text-gris-fonce-lm hover:bg-separateurs-lm transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                  <div className="flex gap-2 items-center">
                    <LLMSwitcher mode={llmMode} onModeChange={setLlmMode} size="mobile" />
                    <button
                      type="button"
                      aria-label="Envoyer"
                      className="bg-orange flex items-center justify-center p-2 rounded-r-sm size-[32px]"
                    >
                      <Mic size={16} className="text-blanc-lm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP  (hidden on mobile, flex on md+)
      ══════════════════════════════════════════ */}
      <div className="hidden md:flex h-screen overflow-hidden relative bg-blanc-lm">
        {/* Background image */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/background-home.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Left sidebar */}
        <DesktopNav
          pinnedItems={PINNED_ITEMS}
          recentItems={RECENT_ITEMS}
          activeItemId="c2"
          className="relative z-10"
        />

        {/* Right content */}
        <div className="relative z-10 flex flex-col flex-1 min-w-0 h-full">

          {/* Header */}
          <header className="flex items-center justify-between px-8 h-[80px] shrink-0">
            {/* Logo */}
            <div className="relative h-[40px] w-[160px] overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="Secured ChatGPT"
                width={1507}
                height={500}
                className="absolute max-w-none"
                style={{ height: "143%", width: "108%", top: "-17%", left: "-5%" }}
                priority
              />
            </div>

            {/* Profile card */}
            <div className="bg-blanc-lm/50 border border-separateurs-lm rounded-r-lg shadow-[0px_5px_25px_rgba(0,0,0,0.05)] flex items-center gap-3 px-4 h-[56px] shrink-0">
              <div className="size-[40px] rounded-full overflow-hidden shrink-0">
                <Image src="/avatar.png" alt="Profil" width={40} height={40} className="object-cover size-full" />
              </div>
              <AlignJustify size={20} className="text-gris-fonce-lm shrink-0" />
            </div>
          </header>

          {/* Main — vertically centered */}
          <main className="flex flex-1 flex-col items-center justify-center px-8 min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-6 items-center w-full max-w-[827px]">

              {/* Greeting */}
              <p className="font-onest font-normal text-display-desktop text-title-lm text-center whitespace-nowrap">
                Bonjour <span className="text-orange">Jeanne !</span>
              </p>

              <div className="flex flex-col gap-6 items-center w-full">
                {/* Prompt bar */}
                <div className="bg-blanc-lm border border-blanc-lm rounded-[18px] shadow-[0px_5px_24px_rgba(0,0,0,0.1)] flex flex-col gap-12 px-4 pt-6 pb-4 w-full max-w-[800px]">
                  <p className="px-3 text-body text-gris-fonce-lm font-inter font-normal">
                    Que puis-je pour vous aujourd&apos;hui ?
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      aria-label="Options"
                      className="flex items-center justify-center rounded-r-sm size-[44px] text-gris-fonce-lm hover:bg-separateurs-lm transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                    <div className="flex gap-3 items-center">
                      <LLMSwitcher mode={llmMode} onModeChange={setLlmMode} size="desktop" />
                      <button
                        type="button"
                        aria-label="Envoyer"
                        className="bg-orange flex items-center justify-center rounded-r-md size-[44px]"
                      >
                        <Mic size={20} className="text-blanc-lm" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Suggested prompts — 2 rows × 3 + bibliothèque button */}
                <div className="flex gap-4 items-end justify-end px-6 w-full max-w-[800px]">
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex gap-4">
                      {SUGGESTED_PROMPTS_DESKTOP.slice(0, 3).map((prompt, i) => (
                        <button
                          key={i}
                          type="button"
                          className="backdrop-blur-[8px] bg-blanc-lm/50 flex flex-col gap-1.5 items-start px-4 py-3 rounded-r-md shadow-[0px_5px_25px_rgba(0,0,0,0.05)] flex-1 min-w-0 overflow-hidden text-left"
                        >
                          <span className="font-onest font-normal text-caption-desktop text-title-lm truncate w-full">
                            {prompt.title}
                          </span>
                          <span className="font-inter font-normal text-caption-mobile text-gris-fonce-lm line-clamp-2 w-full">
                            {prompt.text}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {SUGGESTED_PROMPTS_DESKTOP.slice(3, 6).map((prompt, i) => (
                        <button
                          key={i}
                          type="button"
                          className="backdrop-blur-[8px] bg-blanc-lm/50 flex flex-col gap-1.5 items-start px-4 py-3 rounded-r-md shadow-[0px_5px_25px_rgba(0,0,0,0.05)] flex-1 min-w-0 overflow-hidden text-left"
                        >
                          <span className="font-onest font-normal text-caption-desktop text-title-lm truncate w-full">
                            {prompt.title}
                          </span>
                          <span className="font-inter font-normal text-caption-mobile text-gris-fonce-lm line-clamp-2 w-full">
                            {prompt.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Bibliothèque button */}
                  <button
                    type="button"
                    aria-label="Bibliothèque de prompts"
                    className="flex items-center justify-center rounded-r-md size-[44px] text-gris-fonce-lm hover:bg-blanc-lm/80 transition-colors shrink-0"
                  >
                    <BookMarked size={20} />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
