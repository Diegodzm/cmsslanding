import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { heroSchema } from '@/sanity/schemas/hero' // O tus schemas

export const config = defineConfig({
  name: 'default',
  title: 'CMS Landing Page',

  projectId: '2fllbdos',
  dataset: 'production',
  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: [heroSchema],
  },
})