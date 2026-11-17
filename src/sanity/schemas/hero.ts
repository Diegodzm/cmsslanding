import { defineType, defineField } from "sanity";

export const heroSchema = defineType({
  name: "hero",
  title: "Sección Hero",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título Principal",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo / Descripción",
      type: "text",
    }),
    defineField({
      name: "ctaText",
      title: "Texto Botón Principal",
      type: "string",
    }),
  ],
});