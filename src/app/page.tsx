"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { LinkButton } from "@/components/ui/link-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faqs, testimonials } from "@/lib/data";
import { FacetChips } from "@/components/filters/facet-chips";
import { cn } from "@/lib/utils";

const materials = [
  { id: "estate", label: "Estate", image: "1560448204-e02f11c3d0e2" },
  { id: "reno", label: "Reno debris", image: "1600585154340-be6161a56a0c" },
  { id: "yard", label: "Yard waste", image: "1416879595882-3373a0480b5b" },
  { id: "commercial", label: "Commercial", image: "1497366216548-37526070297c" },
];

const journey = [
  {
    title: "Post with photos",
    body: "Merchandising-ready job cards with budget, deadline, and map pin.",
  },
  {
    title: "Compare immersive bids",
    body: "Browse team ratings, certifications, and timing like a storefront.",
  },
  {
    title: "Track the cleanup",
    body: "Timeline, chat, and before/after proof in one mobile flow.",
  },
  {
    title: "Pay with confidence",
    body: "Escrow holds funds until you approve and leave a rating.",
  },
];

export default function LandingPage() {
  const [material, setMaterial] = useState("estate");
  const [faqChip, setFaqChip] = useState("all");
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const active = materials.find((m) => m.id === material) || materials[0];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const filteredFaqs =
    faqChip === "poster"
      ? faqs.filter((_, i) => i % 2 === 0)
      : faqChip === "team"
        ? faqs.filter((_, i) => i % 2 === 1)
        : faqs;

  return (
    <div className="min-h-dvh bg-[radial-gradient(120%_90%_at_50%_-20%,#fff1f3_0%,#ffffff_42%,#f7f3ef_100%)]">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <BrandLogo size="md" />
          <LinkButton variant="ghost" className="rounded-md" href="/auth/login">Log in</LinkButton>
        </div>
      </header>

      {/* Hero — Interactive configurator archetype */}
      <section className="relative overflow-hidden px-4 pt-8 pb-6">
        <div className="mx-auto max-w-md">
          <p className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="size-4" />
            Cleanup marketplace
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-semibold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-3 duration-700">
            PropTek
          </h1>
          <p className="mt-3 max-w-sm text-base text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Post cleanup jobs, browse immersive bids, and pay when the space
            looks storefront-ready.
          </p>

          <div className="relative mt-6 overflow-hidden rounded-lg bg-[#f3eee8] shadow-sm">
            <div className="relative aspect-[4/5]">
              <Image
                key={active.id}
                src={`https://images.unsplash.com/photo-${active.image}?w=900&h=1100&fit=crop`}
                alt={active.label}
                fill
                priority
                className="object-cover transition-opacity duration-500"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-4">
                <p className="text-sm text-white/90">Preview job vibe</p>
                <p className="font-[family-name:var(--font-display)] text-xl text-white">
                  {active.label}
                </p>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto p-3">
              {materials.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterial(m.id)}
                  className={cn(
                    "shrink-0 rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200",
                    material === m.id
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <LinkButton size="lg" className="h-12 rounded-md text-base" href="/auth/login?role=poster">Post a Job
                <ArrowRight className="size-4" /></LinkButton>
            <LinkButton size="lg"
              variant="outline"
              className="h-12 rounded-md text-base" href="/auth/login?role=team">Find Cleanup Jobs</LinkButton>
          </div>
        </div>
      </section>

      {/* How it works — Horizontal scroll journey */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            How it works
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Swipe the journey — from posting to payment.
          </p>
          <div
            ref={trackRef}
            className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {journey.map((step, i) => (
              <article
                key={step.title}
                className="w-[78%] shrink-0 snap-center rounded-lg border bg-white/90 p-5 shadow-sm"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {i === 0 ? (
                    <Sparkles className="size-5" />
                  ) : i === 1 ? (
                    <Star className="size-5" />
                  ) : i === 2 ? (
                    <Truck className="size-5" />
                  ) : (
                    <CheckCircle2 className="size-5" />
                  )}
                </div>
                <p className="text-xs font-medium tracking-wide text-primary uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-foreground transition-[width] duration-150"
              style={{ width: `${Math.max(8, progress)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials gallery */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Loved by posters & teams
          </h2>
          <div className="mt-5 grid gap-3">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            FAQ
          </h2>
          <FacetChips
            className="mt-3"
            options={[
              { label: "All", value: "all" },
              { label: "Job posters", value: "poster" },
              { label: "Cleanup teams", value: "team" },
            ]}
            value={faqChip}
            onChange={(v) => setFaqChip(String(v) || "all")}
          />
          <Accordion className="mt-4">
            {filteredFaqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t bg-white/70 px-4 py-8">
        <div className="mx-auto flex max-w-md flex-col gap-4">
          <BrandLogo size="sm" />
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/denied" className="text-muted-foreground underline-offset-4 hover:underline">
              Legal
            </Link>
            <Link href="/denied" className="text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <a
              href="mailto:hello@proptek.app"
              className="text-muted-foreground underline-offset-4 hover:underline"
            >
              Contact
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PropTek. Cleanup marketplace for
            properties that deserve a second look.
          </p>
        </div>
      </footer>

      {/* Sticky CTA bar */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-md gap-2">
          <LinkButton className="h-11 flex-1 rounded-md" href="/auth/login">Get started</LinkButton>
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
}
