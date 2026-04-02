import { plainTextFromHtml } from "../component/Seo";

const DEFAULT_DESC =
  "Portfolio — projects, skills, certificates, education, work experience, and blog.";

function mergeKeywords(...parts) {
  const raw = parts.filter(Boolean).join(", ");
  return [...new Set(raw.split(",").map((s) => s.trim()).filter(Boolean))].join(
    ", "
  );
}

/**
 * SEO meta for the single-page portfolio as the user scrolls through sections.
 * @param {string} sectionId - id of section element (#home, #about, …)
 * @param {Record<string, unknown> | null} user - user profile from API
 */
export function getPortfolioSeoForSection(sectionId, user) {
  const name = (user?.name && String(user.name).trim()) || "Ramnarayan";
  const userKw = user?.seoKeywords?.trim();
  const userTitle = user?.seoTitle?.trim();
  const userDesc = user?.seoDescription?.trim();
  const bioPlain = plainTextFromHtml(user?.bio || "", 200);

  if (sectionId === "home") {
    return {
      title: userTitle || `${name} — Portfolio`,
      description: userDesc || bioPlain || DEFAULT_DESC,
      keywords: mergeKeywords(userKw, `portfolio, developer, ${name}`),
      ogImage: user?.image,
    };
  }

  const map = {
    about: {
      title: `About — ${name}`,
      description:
        bioPlain || `About ${name} — background, skills, and contact.`,
      keywords: mergeKeywords(userKw, `about, bio, ${name}, portfolio`),
    },
    workexperience: {
      title: `Work Experience — ${name}`,
      description: `Professional work experience and roles for ${name}.`,
      keywords: mergeKeywords(userKw, `work experience, career, ${name}`),
    },
    education: {
      title: `Education — ${name}`,
      description: `Education, degrees, and academic background for ${name}.`,
      keywords: mergeKeywords(userKw, `education, degree, university, ${name}`),
    },
    skills: {
      title: `Skills — ${name}`,
      description: `Technical skills, technologies, and proficiency for ${name}.`,
      keywords: mergeKeywords(
        userKw,
        `skills, programming, MERN, JavaScript, ${name}`
      ),
    },
    projects: {
      title: `Projects — ${name}`,
      description: `Selected projects and portfolio work by ${name}.`,
      keywords: mergeKeywords(
        userKw,
        `projects, portfolio, web development, ${name}`
      ),
    },
    certificate: {
      title: `Certificates — ${name}`,
      description: `Professional certifications and credentials for ${name}.`,
      keywords: mergeKeywords(userKw, `certificates, credentials, ${name}`),
    },
    blog: {
      title: `Blog — ${name}`,
      description: `Blog posts and articles by ${name}.`,
      keywords: mergeKeywords(userKw, `blog, articles, tech, ${name}`),
    },
  };

  const s = map[sectionId];
  if (!s) {
    return getPortfolioSeoForSection("home", user);
  }

  return {
    title: s.title,
    description: s.description,
    keywords: s.keywords,
    ogImage: user?.image,
  };
}
