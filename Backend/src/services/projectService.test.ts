import { describe, it, expect } from "vitest";
import { parseTechnologiesUsed } from "./projectService.js";

describe("parseTechnologiesUsed", () => {
  it("parses JSON array string from multipart", () => {
    const r = parseTechnologiesUsed('["React","Node"]');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual(["React", "Node"]);
  });

  it("accepts array as-is", () => {
    const r = parseTechnologiesUsed(["a", "b"]);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual(["a", "b"]);
  });

  it("returns error for invalid JSON", () => {
    const r = parseTechnologiesUsed("{not json");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/Invalid JSON/);
  });

  it("returns error when missing", () => {
    const r = parseTechnologiesUsed(undefined);
    expect(r.ok).toBe(false);
  });

  it("filters empty strings", () => {
    const r = parseTechnologiesUsed('["a","","b"]');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual(["a", "b"]);
  });
});
