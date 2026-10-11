import type { Cta, HomeContent } from '../types';

const start: Cta = { label: 'Get started for free', href: '/login', kind: 'app' };
const download: Cta = { label: 'Download desktop app', href: '/download', kind: 'download' };

/** Homepage copy, art direction v3 (11 Oct 2026, from the validated mock). */
export const home: HomeContent = {
  hero: {
    heading: 'When finding a job is not a job itself',
    intro: 'Find offers, apply, and prepare your interviews in one space.',
    ctas: [start, download],
  },
  boards: {
    title: 'Search every job board you use, at once',
    items: [
      { name: 'Welcome to the Jungle', domain: 'welcometothejungle.com' },
      { name: 'LinkedIn', domain: 'linkedin.com' },
      { name: 'Indeed', domain: 'indeed.com' },
      { name: 'HelloWork', domain: 'hellowork.com' },
      { name: 'Jobs That Make Sense', domain: 'jobsthatmakesense.com' },
      { name: 'Glassdoor', domain: 'glassdoor.com' },
      { name: 'Collective.work', domain: 'collective.work' },
      { name: 'France Travail', domain: 'francetravail.org' },
    ],
  },
  features: {
    title: 'Everything your search needs',
    cards: [
      {
        title: 'Start from your resume',
        visual: 'resume',
        text: 'Import your resume or LinkedIn export to build your profile in minutes. The more you add, the better apply tailors your resumes and cover letters.',
      },
      {
        title: 'Search across every board',
        visual: 'search',
        soon: true,
        text: 'Set your filters once: role, location, contract, salary, remote. Choose the job boards to search and get every match in one list.',
      },
      {
        title: 'Be the first to know',
        visual: 'alerts',
        soon: true,
        text: 'Get notified as soon as a new offer matches your search, and apply while it is still fresh.',
      },
      {
        title: 'Apply with confidence',
        visual: 'apply',
        soon: true,
        text: 'apply reads each offer, shows how it matches your profile and what to know about the company, then helps you tailor your resume, write your cover letter and autofill the form.',
      },
      {
        title: 'Track every application',
        visual: 'track',
        text: 'See where each application stands at a glance, and know when it is time to follow up.',
      },
      {
        title: 'Prepare every interview',
        visual: 'prepare',
        text: 'Write your notes, start from a template for each type of interview and get tips before you walk in.',
      },
    ],
  },
  journey: {
    label: 'How apply helps',
    steps: [
      {
        key: 'find',
        title: 'Find',
        visual: 'search',
        text: 'Search all your job boards at once from the desktop app, with your own sessions. New offers are saved to your account.',
        link: { label: 'Learn more', href: '/product#job-offers' },
      },
      {
        key: 'apply',
        title: 'Apply',
        visual: 'apply',
        text: 'Each offer is analysed against your profile. Tailor your resume, write your cover letter and let the extension fill the form.',
        link: { label: 'Learn more', href: '/product#profile' },
      },
      {
        key: 'track',
        title: 'Track',
        visual: 'track',
        text: 'Every application on one board, with its status, documents, contacts and the next date to remember.',
        link: { label: 'Learn more', href: '/product#applications' },
      },
      {
        key: 'prepare',
        title: 'Prepare',
        visual: 'prepare',
        text: 'Each interview round keeps the people you meet, your notes and the questions to ask.',
        link: { label: 'Learn more', href: '/product#interviews' },
      },
    ],
  },
  views: {
    title: 'Your applications, your way',
    label: 'Views',
    items: [
      { key: 'board', label: 'Board' },
      { key: 'table', label: 'Table' },
      { key: 'timeline', label: 'Timeline' },
      { key: 'map', label: 'Map' },
    ],
  },
  apps: {
    title: 'With you, wherever you search',
    items: [
      {
        key: 'desktop',
        title: 'Desktop app',
        text: 'Runs your searches on your Mac with your own job board sessions. Same account as the web.',
        cta: { label: 'Download for macOS', href: '/download', kind: 'download' },
      },
      {
        key: 'mobile',
        title: 'Mobile app',
        soon: true,
        text: 'Check an application or read your prep notes on the way to an interview.',
        cta: { label: 'Get notified', href: '/login', kind: 'app' },
      },
      {
        key: 'extension',
        title: 'Chrome extension',
        soon: true,
        text: 'Save an offer from any page and fill application forms from your profile.',
        cta: { label: 'Get notified', href: '/login', kind: 'app' },
      },
    ],
  },
  closing: {
    title: 'Give your job search one space',
    ctas: [start, download],
  },
};
