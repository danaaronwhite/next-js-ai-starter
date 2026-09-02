"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { GALLERY_CATALOG } from "@/components/gallery/catalog";
import { cn } from "@/lib/utils";

export function GalleryNav({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<string>(GALLERY_CATALOG[0]?.id ?? "");

  useEffect(() => {
    const sections = GALLERY_CATALOG.map((entry) =>
      document.getElementById(entry.id),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Component sections"
      className={cn("flex flex-col gap-1 p-1", className)}
    >
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Components
      </p>
      {GALLERY_CATALOG.map((entry) => {
        const isActive = activeId === entry.id;
        return (
          <Link
            key={entry.id}
            href={`#${entry.id}`}
            className={cn(
              "cursor-pointer rounded-xl px-3 py-2.5 text-sm transition-[background-color,color,box-shadow] duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "bg-primary/10 font-medium text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {entry.title}
          </Link>
        );
      })}
    </nav>
  );
}
