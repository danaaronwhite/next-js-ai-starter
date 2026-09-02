import { describe, expect, it } from "vitest";

import { GALLERY_CATALOG, PUBLIC_GALLERY_IDS } from "@/components/gallery/catalog";

describe("gallery catalog", () => {
  it("lists public gallery ids", () => {
    expect(PUBLIC_GALLERY_IDS.length).toBeGreaterThan(0);
    expect(GALLERY_CATALOG.map((entry) => entry.id)).toEqual(PUBLIC_GALLERY_IDS);
  });
});
