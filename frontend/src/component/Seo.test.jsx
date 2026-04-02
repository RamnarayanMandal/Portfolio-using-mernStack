import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { Seo, plainTextFromHtml, resolveEntitySeo } from "./Seo";

describe("resolveEntitySeo", () => {
  it("prefers stored SEO when set", () => {
    const r = resolveEntitySeo(
      { seoTitle: "Custom", seoDescription: "D", seoKeywords: "k" },
      { title: "T", description: "X", keywords: "y" }
    );
    expect(r.title).toBe("Custom");
    expect(r.description).toBe("D");
    expect(r.keywords).toBe("k");
  });

  it("falls back when SEO empty", () => {
    const r = resolveEntitySeo(
      { seoTitle: "", seoDescription: "  " },
      { title: "T", description: "X", keywords: "y" }
    );
    expect(r.title).toBe("T");
    expect(r.description).toBe("X");
  });
});

describe("plainTextFromHtml", () => {
  it("strips HTML tags", () => {
    expect(plainTextFromHtml("<p>Hello <strong>world</strong></p>")).toBe("Hello world");
  });

  it("truncates with ellipsis when longer than maxLen", () => {
    const long = "a".repeat(200);
    const out = plainTextFromHtml(long, 10);
    expect(out.endsWith("…")).toBe(true);
    expect(out.length).toBe(11);
  });
});

describe("Seo", () => {
  it("sets document title via Helmet", async () => {
    render(
      <HelmetProvider>
        <Seo title="Smoke Test Title" description="Test description" path="/" />
      </HelmetProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe("Smoke Test Title");
    });
  });

  it("renders meta keywords when provided", async () => {
    render(
      <HelmetProvider>
        <Seo
          title="T"
          description="D"
          keywords="react, portfolio, mern"
          path="/"
        />
      </HelmetProvider>
    );
    await waitFor(() => {
      const meta = document.querySelector('meta[name="keywords"]');
      expect(meta?.getAttribute("content")).toBe("react, portfolio, mern");
    });
  });
});
