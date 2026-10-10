import { feature, page, pricingPlan, resource, siteSettings } from './documents';
import { cta, navLink, productDemo, textLink } from './shared';
import {
  cardsSection, ctaSection, downloadSection, factsSection, faqSection, featuresSection, flowSection, plansSection, scatterSection,
  spotlightSection, stepsSection, textSection, trustSection, viewsSection,
} from './sections';

export const schemaTypes = [
  siteSettings, page, feature, pricingPlan, resource,
  cta, navLink, productDemo, textLink,
  cardsSection, stepsSection, textSection, faqSection, plansSection, featuresSection, ctaSection,
  scatterSection, spotlightSection, viewsSection, flowSection, downloadSection, trustSection, factsSection,
];
