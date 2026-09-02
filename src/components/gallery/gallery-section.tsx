import { cn } from "@/lib/utils";

type GallerySectionProps = {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
};

export function GallerySection({
  id,
  title,
  description,
  children,
  className,
}: GallerySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-28 space-y-6 pb-16", className)}
    >
      <div className="space-y-2 border-b border-border/60 pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
          Component
        </p>
        <h2
          id={`${id}-title`}
          className="font-heading text-3xl font-bold tracking-tight md:text-4xl"
        >
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}

function GalleryStory({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur-sm",
        "transition-[box-shadow,border-color] duration-200 hover:border-primary/20 hover:shadow-md",
        className,
      )}
    >
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="min-h-[2.5rem]">{children}</div>
    </article>
  );
}

export { GalleryStory };
