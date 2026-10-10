/**
 * Facts about the company behind applyspace that only the founder can provide. One typed place,
 * read by the Privacy policy and the Terms of use. A `null` value renders on the page as a
 * visible "[to be completed: …]" marker, so nothing is invented. Fill these before launch.
 */

export type LegalField =
  | 'entityName'
  | 'legalForm'
  | 'registeredAddress'
  | 'siret'
  | 'rcs'
  | 'publicationDirector'
  | 'contactEmail'
  | 'privacyEmail'
  | 'hostingRegion'
  | 'accountRetention'
  | 'deletedDataRetention'
  | 'analyticsRetention'
  | 'paymentProvider'
  | 'consumerMediator';

export type LegalConfig = Record<LegalField, { label: string; value: string | null }>;

export const legalConfig: LegalConfig = {
  entityName: { label: 'legal entity name', value: null },
  legalForm: { label: 'legal form and share capital', value: null },
  registeredAddress: { label: 'registered office address', value: null },
  siret: { label: 'SIRET number', value: null },
  rcs: { label: 'RCS registration (city and number)', value: null },
  publicationDirector: { label: 'publication director', value: null },
  contactEmail: { label: 'contact email', value: null },
  privacyEmail: { label: 'privacy contact email', value: null },
  hostingRegion: { label: 'database hosting region (Supabase project region)', value: null },
  accountRetention: { label: 'retention period of inactive accounts', value: null },
  deletedDataRetention: { label: 'delay to erase data and backups after account deletion', value: null },
  analyticsRetention: { label: 'analytics data retention period', value: null },
  paymentProvider: { label: 'payment provider, once paid plans are live', value: null },
  consumerMediator: { label: 'consumer mediator (name and website)', value: null },
};

/** Date shown as "Last updated" on both pages (ISO). */
export const LEGAL_LAST_UPDATED = '2026-10-10';
