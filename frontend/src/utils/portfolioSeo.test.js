import { describe, it, expect } from "vitest";
import { getPortfolioSeoForSection } from "./portfolioSeo";

describe("getPortfolioSeoForSection", () => {
  const user = {
    name: "Ada",
    seoTitle: "Global title",
    seoDescription: "Global desc",
    seoKeywords: "engineer, ada",
    bio: "<p>Hello</p>",
    image: "https://example.com/a.png",
  };

  it("uses user SEO on home", () => {
    const s = getPortfolioSeoForSection("home", user);
    expect(s.title).toBe("Global title");
    expect(s.description).toBe("Global desc");
    expect(s.keywords).toContain("engineer");
    expect(s.ogImage).toBe(user.image);
  });

  it("uses section title for projects", () => {
    const s = getPortfolioSeoForSection("projects", user);
    expect(s.title).toBe("Projects — Ada");
    expect(s.description).toMatch(/Ada/);
    expect(s.keywords).toContain("projects");
  });
});
