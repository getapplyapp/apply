import { defineField, defineType } from 'sanity';

/** Language is a plain hidden field for now (only `en`); French documents will set it to `fr`. */
export const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  options: { list: [{ title: 'English', value: 'en' }] },
  initialValue: 'en',
  validation: (rule) => rule.required(),
});

export const seoFields = [
  defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo', description: 'Up to 60 characters. The site name is appended automatically.', validation: (r) => r.max(70).warning('Keep titles under 60 characters.') }),
  defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, group: 'seo', description: '120 to 155 characters.', validation: (r) => r.max(170).warning('Keep descriptions under 155 characters.') }),
  defineField({ name: 'ogImage', title: 'Social share image', type: 'image', group: 'seo', description: '1200 x 630. If empty, a card with the page title is generated.' }),
  defineField({ name: 'noindex', title: 'Hide from search engines', type: 'boolean', group: 'seo', initialValue: false }),
];

export const seoGroups = [{ name: 'seo', title: 'SEO' }];

export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'Path', type: 'string', description: 'Internal path (/pricing) or app path (/login).', validation: (r) => r.required() }),
    defineField({ name: 'kind', type: 'string', options: { list: [{ title: 'Internal page', value: 'internal' }, { title: 'Opens the app', value: 'app' }, { title: 'Desktop download', value: 'download' }] }, initialValue: 'internal' }),
  ],
});

export const navLink = defineType({
  name: 'navLink',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'Path', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
});

/** Keys of the live product demos built in the website code (apps/web/src/site/components/demos). */
export const DEMO_KEYS = [
  { title: 'Applications board (hero)', value: 'board' },
  { title: 'Applications hub with layouts', value: 'applications' },
  { title: 'Job offers search', value: 'search' },
  { title: 'Interview process', value: 'interviews' },
  { title: 'Profile from a resume', value: 'profile' },
];

/**
 * A live product demo: an interactive React island with demo data, picked by key. No images: the demo is code,
 * so it always matches the product.
 */
export const productDemo = defineType({
  name: 'productDemo',
  title: 'Product demo',
  type: 'object',
  fields: [
    defineField({ name: 'demo', type: 'string', options: { list: DEMO_KEYS }, validation: (r) => r.required() }),
    defineField({ name: 'label', title: 'Accessible label', type: 'string', description: 'What the demo shows and what visitors can do with it.', validation: (r) => r.required() }),
    defineField({ name: 'caption', type: 'string', description: 'Shown as "Fig. N - caption". Leave empty for no caption.' }),
  ],
  preview: { select: { title: 'demo', subtitle: 'caption' } },
});

export const textLink = defineType({
  name: 'textLink',
  title: 'Text link',
  type: 'object',
  fields: [defineField({ name: 'label', type: 'string' }), defineField({ name: 'href', title: 'Path', type: 'string' })],
});
