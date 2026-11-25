import createImageUrlBuilder from "@sanity/image-url";
import { sanityDataset, sanityProjectId } from "@/sanity/config";

const builder = createImageUrlBuilder({
  projectId: sanityProjectId,
  dataset: sanityDataset,
});

export function urlForLabImage(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}

export interface CmsLabHighlight {
  _key?: string;
  title?: string;
  description?: string;
}

export interface CmsLabData {
  eyebrow?: string;
  headline?: string;
  summary?: string;
  featuredImage?: {
    alt?: string;
    asset?: {
      _id?: string;
      _ref?: string;
      url?: string;
    };
  };
  cta?: {
    label?: string;
    href?: string;
  };
  layoutVariant?: "default" | "highlighted";
  showHighlights?: boolean;
  highlights?: CmsLabHighlight[];
}

export const cmsLabQuery = `*[_type == "cmsLab" && !(_id in path("drafts.**"))][0]{
  eyebrow,
  headline,
  summary,
  featuredImage{
    alt,
    asset->{
      _id,
      url
    }
  },
  cta{
    label,
    href
  },
  layoutVariant,
  showHighlights,
  highlights[]{
    _key,
    title,
    description
  }
}`;