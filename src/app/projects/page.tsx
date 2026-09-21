"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AlignJustify, Plus, X, FolderOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "@/components/molecules/MobileNav";
import { DesktopNav } from "@/components/molecules/DesktopNav";
import { ProjetCard } from "@/components/molecules/ProjetCard";
import {
  MOCK_PROJECTS,
  PINNED_ITEMS,
  RECENT_ITEMS,
  projectToCardProps,
  type Project,
} from "@/lib/mock-data";

/* ─── Page ───────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const hasExpired = projects.some((p) => p.expired);
  const showBanner = hasExpired && !bannerDismissed;

  function handlePin(id: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p))
    );
  }

  function handleDelete(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  const cardHandlers = (id: string) => ({
    onPin: () => handlePin(id),
    onEdit: () => {},
    onDelete: () => handleDelete(id),
  });

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
                onNewDiscussion={() => { setNavOpen(false); router.push("/home"); }}
              />
            </SheetContent>
          </Sheet>

          <div className="relative h-[30px] w-[121px] overflow-hidden shrink-0">
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

          <div className="border border-separateurs-lm rounded-full shadow-[0px_5px_25px_rgba(0,0,0,0.05)] overflow-hidden size-[40px] shrink-0">
            <Image src="/avatar.png" alt="Profil" width={40} height={40} className="object-cover size-full" />
          </div>
        </header>

        {/* Bannière expiration */}
        {showBanner && (
          <div className="relative z-10 mx-3 mb-1 flex items-center gap-2 bg-orange/10 border border-orange/30 rounded-r-md px-4 py-3">
            <p className="font-inter font-normal text-caption-desktop text-gris-fonce-lm flex-1">
              Un de vos projets expire bientôt.
            </p>
            <button
              type="button"
              onClick={() => setBannerDismissed(true)}
              aria-label="Fermer"
              className="text-gris-clair-lm hover:text-gris-fonce-lm shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Contenu */}
        <main className="relative z-10 flex flex-col flex-1 gap-6 px-3 py-6 overflow-y-auto">
          {/* SubHeader */}
          <div className="flex items-center justify-between shrink-0">
            <h1 className="font-inter font-semibold text-[28px] text-title-lm leading-normal">
              Projet
            </h1>
            <button
              type="button"
              className="bg-orange flex items-center gap-1.5 px-3 py-2 rounded-r-sm"
            >
              <Plus size={14} className="text-blanc-lm shrink-0" />
              <span className="font-inter font-medium text-caption-desktop text-blanc-lm whitespace-nowrap">
                Projet
              </span>
            </button>
          </div>

          {/* Liste */}
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center">
              <FolderOpen size={32} className="text-gris-clair-lm" />
              <p className="font-inter font-normal text-caption-desktop text-gris-clair-lm">
                Vous n&apos;avez pas encore de projet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {projects.map((projet) => (
                <ProjetCard
                  key={projet.id}
                  {...projectToCardProps(projet)}
                  size="small"
                  {...cardHandlers(projet.id)}
                />
              ))}
            </div>
          )}
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
          activeSection="projets"
          onNewDiscussion={() => router.push("/home")}
          className="relative z-10"
        />

        {/* Right content */}
        <div className="relative z-10 flex flex-col flex-1 min-w-0 h-full">

          {/* Header */}
          <header className="flex items-center justify-between px-8 h-[80px] shrink-0">
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
            <div className="bg-blanc-lm/50 border border-separateurs-lm rounded-r-lg shadow-[0px_5px_25px_rgba(0,0,0,0.05)] flex items-center gap-3 px-4 h-[56px] shrink-0">
              <div className="size-[40px] rounded-full overflow-hidden shrink-0">
                <Image src="/avatar.png" alt="Profil" width={40} height={40} className="object-cover size-full" />
              </div>
              <AlignJustify size={20} className="text-gris-fonce-lm shrink-0" />
            </div>
          </header>

          {/* Bannière expiration */}
          {showBanner && (
            <div className="mx-8 mb-2 flex items-center gap-3 bg-orange/10 border border-orange/30 rounded-r-md px-6 py-3">
              <p className="font-inter font-normal text-body text-gris-fonce-lm flex-1">
                Un de vos projets expire bientôt. Pensez à le renouveler pour ne pas perdre vos données.
              </p>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                aria-label="Fermer"
                className="text-gris-clair-lm hover:text-gris-fonce-lm shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Main */}
          <main className="flex flex-col flex-1 min-h-0 overflow-y-auto px-[124px] py-8 gap-8">

            {/* SubHeader */}
            <div className="flex items-center justify-between shrink-0">
              <h1 className="font-inter font-semibold text-page-title text-title-lm leading-normal">
                Projets
              </h1>
              <button
                type="button"
                className="bg-orange flex items-center gap-2 px-4 py-2.5 rounded-r-sm"
              >
                <Plus size={16} className="text-blanc-lm shrink-0" />
                <span className="font-inter font-medium text-body text-blanc-lm whitespace-nowrap">
                  + Projet
                </span>
              </button>
            </div>

            {/* Grille / état vide */}
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center">
                <FolderOpen size={40} className="text-gris-clair-lm" />
                <p className="font-inter font-normal text-body text-gris-clair-lm">
                  Vous n&apos;avez pas encore de projet.
                </p>
                <button
                  type="button"
                  className="bg-orange flex items-center gap-2 px-4 py-2.5 rounded-r-sm"
                >
                  <Plus size={16} className="text-blanc-lm shrink-0" />
                  <span className="font-inter font-medium text-body text-blanc-lm">
                    Créer un projet
                  </span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {projects.map((projet) => (
                  <ProjetCard
                    key={projet.id}
                    {...projectToCardProps(projet)}
                    size="large"
                    {...cardHandlers(projet.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
