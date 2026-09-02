"use client";

import { AlertCircle, CheckCircle2, Info, Sparkles } from "lucide-react";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/field";
import { GALLERY_CATALOG } from "@/components/gallery/catalog";
import { GalleryNav } from "@/components/gallery/gallery-nav";
import {
  GallerySection,
  GalleryStory,
} from "@/components/gallery/gallery-section";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

function ComponentStories({ entryId }: { entryId: string }) {
  switch (entryId) {
    case "button":
      return (
        <>
          <GalleryStory title="Variants">
            <div className="flex flex-wrap gap-3">
              <Button className="cursor-pointer">Default</Button>
              <Button className="cursor-pointer" variant="secondary">
                Secondary
              </Button>
              <Button className="cursor-pointer" variant="outline">
                Outline
              </Button>
              <Button className="cursor-pointer" variant="ghost">
                Ghost
              </Button>
              <Button className="cursor-pointer" variant="destructive">
                Destructive
              </Button>
              <Button className="cursor-pointer" variant="link">
                Link
              </Button>
            </div>
          </GalleryStory>
          <GalleryStory title="Sizes and disabled">
            <div className="flex flex-wrap items-center gap-3">
              <Button className="cursor-pointer" size="sm">
                Small
              </Button>
              <Button className="cursor-pointer">Default</Button>
              <Button className="cursor-pointer" size="lg">
                Large
              </Button>
              <Button className="cursor-pointer" disabled>
                Disabled
              </Button>
            </div>
          </GalleryStory>
        </>
      );
    case "field":
      return (
        <>
          <GalleryStory title="Default">
            <Field className="max-w-md">
              <FieldLabel htmlFor="gallery-email">Email</FieldLabel>
              <Input
                id="gallery-email"
                type="email"
                placeholder="you@example.com"
              />
              <FieldDescription>
                We will never share your email.
              </FieldDescription>
            </Field>
          </GalleryStory>
          <GalleryStory title="Error">
            <Field className="max-w-md">
              <FieldLabel htmlFor="gallery-name">Name</FieldLabel>
              <Input id="gallery-name" aria-invalid defaultValue="A" />
              <FieldError>Name must be at least 2 characters.</FieldError>
            </Field>
          </GalleryStory>
        </>
      );
    case "input":
      return (
        <GalleryStory title="States">
          <div className="grid max-w-md gap-4">
            <Input placeholder="Default" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Error" aria-invalid defaultValue="Invalid" />
          </div>
        </GalleryStory>
      );
    case "textarea":
      return (
        <GalleryStory title="Default">
          <Textarea
            className="max-w-md min-h-28"
            placeholder="Write a short note..."
          />
        </GalleryStory>
      );
    case "select":
      return (
        <GalleryStory title="Options">
          <Select defaultValue="starter">
            <SelectTrigger className="max-w-md cursor-pointer">
              <SelectValue placeholder="Choose a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starter" className="cursor-pointer">
                Starter
              </SelectItem>
              <SelectItem value="pro" className="cursor-pointer">
                Pro
              </SelectItem>
              <SelectItem value="team" className="cursor-pointer">
                Team
              </SelectItem>
            </SelectContent>
          </Select>
        </GalleryStory>
      );
    case "checkbox":
      return (
        <GalleryStory title="Labelled">
          <div className="flex items-center gap-3">
            <Checkbox id="gallery-terms" className="cursor-pointer" />
            <Label htmlFor="gallery-terms" className="cursor-pointer">
              Accept terms
            </Label>
          </div>
        </GalleryStory>
      );
    case "switch":
      return (
        <GalleryStory title="Settings">
          <div className="flex items-center gap-3">
            <Switch id="gallery-notifications" className="cursor-pointer" />
            <Label htmlFor="gallery-notifications" className="cursor-pointer">
              Enable notifications
            </Label>
          </div>
        </GalleryStory>
      );
    case "card":
      return (
        <GalleryStory title="Composition">
          <Card className="max-w-md border-border/60 shadow-md">
            <CardHeader>
              <CardTitle>Project card</CardTitle>
              <CardDescription>
                Cards group related content and actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field>
                <FieldLabel htmlFor="card-input">Label</FieldLabel>
                <Input id="card-input" placeholder="Inside a card" />
              </Field>
            </CardContent>
            <CardFooter className="gap-2">
              <Button className="cursor-pointer" size="sm">
                Save
              </Button>
              <Button className="cursor-pointer" size="sm" variant="outline">
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </GalleryStory>
      );
    case "badge":
      return (
        <GalleryStory title="Variants">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </GalleryStory>
      );
    case "alert":
      return (
        <div className="grid gap-4">
          <Alert>
            <Info />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              Neutral card-style alert for general information.
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              Secondary surface alert using semantic tokens.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your changes were saved successfully.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertCircle />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Review settings before continuing.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Try again.
            </AlertDescription>
          </Alert>
        </div>
      );
    case "theme-switcher":
      return (
        <GalleryStory title="Controls">
          <ThemeSwitcher compact />
        </GalleryStory>
      );
    default:
      return null;
  }
}

export function GalleryPage() {
  return (
    <div className="gallery-mesh relative min-h-full flex-1">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-10 lg:flex-row lg:gap-12 lg:px-8 lg:py-14">
        <aside className="lg:sticky lg:top-10 lg:h-fit lg:w-60 lg:shrink-0">
          <div className="surface-elevated p-3">
            <GalleryNav />
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-16">
          <header className="space-y-8" role="banner">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              >
                <Sparkles className="size-3.5 text-primary" aria-hidden />
                Design system · v1
              </Badge>
              <h1 className="font-heading max-w-3xl text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                Component gallery
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A living catalog of token-driven, props-based UI. Preview every
                primitive, switch Blue or Grayscale, and tune light or dark — all from
                one surface.
              </p>
            </div>
            <ThemeSwitcher />
          </header>

          <main className="space-y-20">
            {GALLERY_CATALOG.map((entry) => (
              <GallerySection key={entry.id} {...entry}>
                <ComponentStories entryId={entry.id} />
              </GallerySection>
            ))}
          </main>

          <footer className="border-t border-border/60 pt-8 text-sm text-muted-foreground">
            Built with the Next.js AI Starter methodology — FPD, runbooks, and
            reviewable chunks.
          </footer>
        </div>
      </div>
    </div>
  );
}
