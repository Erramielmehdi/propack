import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/calcule", "/a-propos", "/contact"];
  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
