export type GalleryEntry = {
  id: string;
  title: string;
  description: string;
};

export const GALLERY_CATALOG: GalleryEntry[] = [
  {
    id: "button",
    title: "Button",
    description: "Primary actions with variants and sizes.",
  },
  {
    id: "field",
    title: "Field",
    description: "Label, input, description, and error composition.",
  },
  {
    id: "input",
    title: "Input",
    description: "Single-line text controls.",
  },
  {
    id: "textarea",
    title: "Textarea",
    description: "Multi-line text controls.",
  },
  {
    id: "select",
    title: "Select",
    description: "Discrete choice with keyboard support.",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: "Boolean form choices.",
  },
  {
    id: "switch",
    title: "Switch",
    description: "Immediate on/off settings.",
  },
  {
    id: "card",
    title: "Card",
    description: "Grouped content surfaces.",
  },
  {
    id: "badge",
    title: "Badge",
    description: "Compact status and category chips.",
  },
  {
    id: "alert",
    title: "Alert",
    description: "Inline messages and feedback.",
  },
  {
    id: "theme-switcher",
    title: "Theme Switcher",
    description: "Blue/Grayscale palettes and light/dark/system appearance.",
  },
];

export const PUBLIC_GALLERY_IDS = GALLERY_CATALOG.map((entry) => entry.id);
