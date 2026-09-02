"use client";

import { Moon, Sun, Monitor, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useColorTheme } from "@/components/theme-provider";
import { COLOR_THEMES, type ColorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type ThemeSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export function ThemeSwitcher({ className, compact = false }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <div
      className={cn(
        "surface-elevated grid gap-5 p-5",
        compact ? "sm:grid-cols-2" : "lg:grid-cols-2",
        className,
      )}
    >
      <div className="flex items-center gap-2 sm:col-span-2">
        <Palette className="size-4 text-primary" aria-hidden />
        <span className="text-sm font-medium">Theme controls</span>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="color-theme" className="text-muted-foreground">
          Color palette
        </Label>
        <Select
          value={colorTheme}
          onValueChange={(value) => setColorTheme(value as ColorTheme)}
        >
          <SelectTrigger
            id="color-theme"
            className="w-full cursor-pointer capitalize"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COLOR_THEMES.map((themeId) => (
              <SelectItem
                key={themeId}
                value={themeId}
                className="cursor-pointer capitalize"
              >
                {themeId}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <span
          id="appearance-label"
          className="text-sm font-medium leading-none text-muted-foreground"
        >
          Appearance
        </span>
        <div
          className="flex gap-2"
          role="group"
          aria-labelledby="appearance-label"
        >
          <Button
            type="button"
            variant={theme === "light" ? "default" : "outline"}
            size="icon-sm"
            className="cursor-pointer"
            aria-label="Light mode"
            aria-pressed={theme === "light"}
            onClick={() => setTheme("light")}
          >
            <Sun className="size-4" />
          </Button>
          <Button
            type="button"
            variant={theme === "dark" ? "default" : "outline"}
            size="icon-sm"
            className="cursor-pointer"
            aria-label="Dark mode"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme("dark")}
          >
            <Moon className="size-4" />
          </Button>
          <Button
            type="button"
            variant={theme === "system" ? "default" : "outline"}
            size="icon-sm"
            className="cursor-pointer"
            aria-label="System appearance"
            aria-pressed={theme === "system"}
            onClick={() => setTheme("system")}
          >
            <Monitor className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
