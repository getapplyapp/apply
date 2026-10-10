/*
 * DRAFT, NEEDS FOUNDER AND LEGAL REVIEW BEFORE LAUNCH (WEB-14).
 * Written only from what the code does on 10 Oct 2026. Founder-only facts are `null` in
 * `config.ts` and show on the page as "[to be completed]". When the product changes (new
 * provider, self-serve export or deletion, desktop job search runner), update this text.
 */
import { type LegalDocument, field, link, p, ul } from './document';

export const privacyPolicy: LegalDocument = {
  path: '/privacy',
  title: 'Privacy policy',
  description:
    'What personal data applyspace collects, why, who processes it, how long it is kept and how to exercise your rights.',
  intro: [
    p(
      'applyspace helps you find job offers, track your applications and prepare your interviews. This policy explains what personal data we handle when you use the website applyspace.app, the web app and the desktop app, and the choices you have. We keep it short and plain on purpose.',
    ),
  ],
  sections: [
    {
      id: 'controller',
      heading: 'Who is responsible for your data',
      blocks: [
        p(
          'The controller of your personal data is ',
          field('entityName'),
          ', ',
          field('legalForm'),
          ', registered office: ',
          field('registeredAddress'),
          ', SIRET ',
          field('siret'),
          '.',
        ),
        p('For any question about your data, write to ', field('privacyEmail'), '.'),
      ],
    },
    {
      id: 'data-we-collect',
      heading: 'Data we collect',
      blocks: [
        ul(
          [
            'Account: your email address and the identifiers sent by the sign-in provider you choose (Google or LinkedIn), and the name you enter. We never see your Google or LinkedIn password.',
          ],
          [
            'Profile and job search: experiences, education, skills, languages, locations and the search criteria you set (job titles, contract types, experience levels, places), and the plan you pick.',
          ],
          ['Applications and interviews: the companies, roles, statuses, dates, notes and interview steps you record.'],
          [
            'Documents: the resumes and other files you upload, and the text we read from a resume when you ask us to prefill your profile with it.',
          ],
          ['Job offers: the offers found by your searches and saved to your account.'],
          [
            'Technical data: like any web service, our hosting provider processes your IP address and browser information to deliver pages and keep the service secure.',
          ],
          ['Usage analytics and error reports, only if you accept them (see Cookies and analytics).'],
        ),
        p(
          'The public demo (demo.applyspace.app) shows fictional data only. It does not ask you to sign in, does not store what you do and sends no analytics.',
        ),
      ],
    },
    {
      id: 'purposes',
      heading: 'Why we use it, and on what legal basis',
      blocks: [
        ul(
          [
            'To provide the service you signed up for: your account, profile, searches, offers, applications, interviews and documents. Basis: performance of our contract with you (the ',
            link('/terms', 'Terms of use'),
            ').',
          ],
          ['To prefill your profile from a resume, when you ask for it. Basis: performance of the contract.'],
          [
            'To keep the service secure, prevent abuse and fix problems. Basis: our legitimate interest in running a reliable service.',
          ],
          [
            'To measure how the product is used and catch errors, through usage analytics. Basis: your consent, which you can withdraw at any time.',
          ],
          ['To answer your requests and tell you about important changes to the service. Basis: performance of the contract.'],
          ['To meet our legal obligations, for example accounting for paid plans. Basis: legal obligation.'],
        ),
        p(
          'We do not sell your data, we do not show advertising and we do not use your data to train AI models.',
        ),
      ],
    },
    {
      id: 'resume-import',
      heading: 'Resume import and AI',
      blocks: [
        p(
          'When you import a resume, our server reads its text and turns it into a profile draft that you review before anything is saved. By default this uses built-in rules, and the text does not leave our servers.',
        ),
        p(
          'If AI-assisted parsing is turned on, the text of your resume is sent to Anthropic (Claude API), which acts as our processor and returns the structured draft. We do not log the request or the answer, and we do not use your resume to train any model.',
        ),
      ],
    },
    {
      id: 'job-board-searches',
      heading: 'Job board searches from the desktop app',
      blocks: [
        p(
          'The desktop app runs your searches on job boards (such as LinkedIn, Welcome to the Jungle, HelloWork and Jobs that Make Sense) with the sessions you open on those sites yourself, on your own computer. Your job board passwords and session cookies stay on your device and are not sent to us. The offers found are saved to your applyspace account.',
        ),
        p(
          'Those job boards are independent services with their own privacy policies and terms. See the ',
          link('/terms#acceptable-use', 'Terms of use'),
          ' for your responsibilities when searching with your own sessions.',
        ),
      ],
    },
    {
      id: 'processors',
      heading: 'Who processes your data',
      blocks: [
        p('We use a small number of providers. Each one only gets what it needs for its task:'),
        ul(
          ['Supabase: database, sign-in and file storage for your account data. Hosting region: ', field('hostingRegion'), '.'],
          ['Vercel: hosting of the website and the web app.'],
          ['PostHog (EU cloud): usage analytics and error reports, only after you accept analytics.'],
          ['Google and LinkedIn: sign-in, only for the provider you choose.'],
          ['Anthropic: resume parsing, only when AI-assisted parsing is turned on.'],
          [
            'Geoapify: location suggestions, address lookup and map tiles. Requests are sent from our servers with the place text you type, not with your account.',
          ],
          [
            'European Commission (ESCO): job title suggestions. Requests are sent from our servers with the text you type.',
          ],
          [
            'Brandfetch: company logos. Your browser loads them directly, so Brandfetch receives your IP address and the company domain.',
          ],
        ),
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      blocks: [
        ul(
          ['Account data, documents and job search data: while your account is active. Inactive accounts: ', field('accountRetention'), '.'],
          ['After you delete your account: erased within ', field('deletedDataRetention'), ', backups included.'],
          ['Usage analytics: ', field('analyticsRetention'), '.'],
          ['Billing records, once paid plans exist: as long as accounting law requires.'],
        ),
      ],
    },
    {
      id: 'transfers',
      heading: 'International transfers',
      blocks: [
        p(
          'Some of our providers are based outside the European Economic Area, notably in the United States. When your data is transferred there, the transfer relies on an adequacy decision (such as the EU-US Data Privacy Framework, where the provider is certified) or on the European Commission’s Standard Contractual Clauses.',
        ),
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      blocks: [
        p(
          'You can ask to access, correct or erase your data, to restrict or object to its use, and to receive it in a portable format. You can withdraw your consent to analytics at any time, and give instructions about what happens to your data after your death.',
        ),
        ul(
          ['Most of your data can be edited or removed directly in the app.'],
          ['Analytics: switch it on or off in Settings > Privacy.'],
          [
            'Data export and account deletion are not self-service yet. Until they are, email ',
            field('privacyEmail'),
            ' from the address of your account and we will do it.',
          ],
        ),
        p(
          'We answer within one month. If you think we have not respected your rights, you can complain to the CNIL (',
          link('https://www.cnil.fr', 'cnil.fr'),
          ') or to the data protection authority of your country.',
        ),
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies and analytics',
      blocks: [
        ul(
          ['Sign-in cookies: needed to keep you signed in. They are strictly necessary and set only when you sign in.'],
          [
            'Analytics: off by default. Once signed in, you are asked once whether to share usage analytics; nothing is sent unless you accept. If you accept, PostHog stores an identifier in your browser and we link usage events and error reports to your account email (never your name). Your choice is stored on your device and can be changed in Settings > Privacy.',
          ],
          ['No advertising or cross-site tracking cookies.'],
        ),
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      blocks: [
        p(
          'Data is encrypted in transit (HTTPS). In our database, row-level security limits each record to the account it belongs to. No system is perfectly secure: if a breach affects your data, we will tell you and the authorities as the law requires.',
        ),
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        p(
          'We will update this page when the product or the law changes, and change the date at the top. For important changes, we will tell you in the app or by email before they apply.',
        ),
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      blocks: [p('Questions or requests about your data: ', field('privacyEmail'), '. Postal address: ', field('registeredAddress'), '.')],
    },
  ],
};
