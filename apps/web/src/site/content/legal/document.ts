import type { LegalField } from './config';

/**
 * Code-defined long-form legal documents (no CMS: the text is versioned and reviewed with the code).
 * Inline parts are plain text, a founder-only fact from `config.ts`, or a link.
 */
export type Inline = string | { field: LegalField } | { href: string; text: string };
export type Rich = Inline[];
export type Block = { kind: 'p'; parts: Rich } | { kind: 'ul'; items: Rich[] };
export type LegalSection = { id: string; heading: string; blocks: Block[] };
export type LegalDocument = {
  path: '/privacy' | '/terms';
  title: string;
  description: string;
  intro: Block[];
  sections: LegalSection[];
};

/** A founder-only fact, rendered as its value or as a "[to be completed]" marker. */
export const field = (name: LegalField): Inline => ({ field: name });
export const link = (href: string, text: string): Inline => ({ href, text });
export const p = (...parts: Rich): Block => ({ kind: 'p', parts });
export const ul = (...items: (Inline | Rich)[]): Block => ({
  kind: 'ul',
  items: items.map((item) => (Array.isArray(item) ? item : [item])),
});
