import { defineField, defineType } from "sanity";

const isSafeHref = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) return true;
  const trimmed = value.trim();
  if (trimmed.startsWith("/")) return true;
  try {
    const parsed = new URL(trimmed);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export const cmsLabSchema = defineType({
  name: "cmsLab",
  title: "Laboratorio CMS (/cmstest)",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Etiqueta superior",
      type: "string",
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "headline",
      title: "Título principal",
      type: "string",
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: "summary",
      title: "Descripción",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "featuredImage",
      title: "Imagen destacada",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo (alt)",
          type: "string",
          validation: (Rule) => Rule.required().max(140),
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Botón / Enlace",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Texto del botón",
          type: "string",
          validation: (Rule) => Rule.max(35),
        }),
        defineField({
          name: "href",
          title: "Destino (/ruta o https://...)",
          type: "string",
          validation: (Rule) =>
            Rule.custom((value) =>
              isSafeHref(value)
                ? true
                : "Usa una ruta relativa (/contacto) o URL http/https/mailto/tel"
            ),
        }),
      ],
    }),
    defineField({
      name: "layoutVariant",
      title: "Variante visual",
      type: "string",
      initialValue: "default",
      options: {
        list: [
          { title: "Estándar", value: "default" },
          { title: "Destacado", value: "highlighted" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "showHighlights",
      title: "Mostrar lista de elementos repetibles",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "highlights",
      title: "Lista de elementos repetibles",
      type: "array",
      of: [
        defineField({
          name: "highlightItem",
          title: "Ítem",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título del ítem",
              type: "string",
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "description",
              title: "Detalle",
              type: "string",
              validation: (Rule) => Rule.max(160),
            }),
          ],
        }),
      ],
    }),
  ],
});