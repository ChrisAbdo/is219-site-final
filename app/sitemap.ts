import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://chrisabdo.dev/",
      lastModified: new Date(),
    },
  ];
}
