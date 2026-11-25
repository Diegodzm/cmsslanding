import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { heroSchema } from "@/sanity/schemas/hero";
import { cmsLabSchema } from "@/sanity/schemas/cmsLab";
import { sanityDataset, sanityProjectId } from "@/sanity/config";

export const config = defineConfig({
  name: "default",
  title: "CMS Landing Page",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [heroSchema, cmsLabSchema],
  },
});