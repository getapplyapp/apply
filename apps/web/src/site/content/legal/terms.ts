/*
 * DRAFT, NEEDS FOUNDER AND LEGAL REVIEW BEFORE LAUNCH (WEB-14).
 * Written from what the product does on 10 Oct 2026; plans and payment stay generic on purpose
 * (no prices or limits here, they live on /pricing). Founder-only facts are `null` in `config.ts`
 * and show on the page as "[to be completed]".
 */
import { type LegalDocument, field, link, p, ul } from './document';

export const termsOfUse: LegalDocument = {
  path: '/terms',
  title: 'Terms of use',
  description:
    'The rules for using applyspace: your account, acceptable use, your content, plans, availability, liability and governing law.',
  intro: [
    p(
      'These terms apply to the website applyspace.app, the web app and the desktop app (together, “applyspace”). By creating an account or using applyspace, you agree to them. Please also read our ',
      link('/privacy', 'Privacy policy'),
      '.',
    ),
  ],
  sections: [
    {
      id: 'publisher',
      heading: 'Who we are',
      blocks: [
        p(
          'applyspace is published by ',
          field('entityName'),
          ', ',
          field('legalForm'),
          ', registered office: ',
          field('registeredAddress'),
          ', SIRET ',
          field('siret'),
          ', RCS ',
          field('rcs'),
          '. Publication director: ',
          field('publicationDirector'),
          '. Contact: ',
          field('contactEmail'),
          '.',
        ),
        p('The website and the web app are hosted by Vercel Inc. (United States). Account data is stored with Supabase.'),
      ],
    },
    {
      id: 'service',
      heading: 'The service',
      blocks: [
        p(
          'applyspace brings your job search together: you can find job offers, track your applications, prepare your interviews and import your resume to fill in your profile. The desktop app can run searches on job boards with your own sessions and save the offers to your account.',
        ),
        p(
          'applyspace is in early access. Features change often, and some may be added, changed or removed. We do not guarantee that you will find a job or that any offer is accurate, available or still open: offers come from third-party job boards and employers.',
        ),
      ],
    },
    {
      id: 'account',
      heading: 'Your account',
      blocks: [
        ul(
          ['You sign in with Google or LinkedIn. An account is personal: one person per account.'],
          ['Keep the information you give us accurate, and keep access to your sign-in account secure.'],
          ['You are responsible for what happens under your account. Tell us at ', field('contactEmail'), ' if you think it was misused.'],
        ),
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      blocks: [
        p('When you use applyspace, you agree not to:'),
        ul(
          ['break the law or the rights of others, or upload content you have no right to share;'],
          ['try to access other accounts or data, test or bypass our security, or disrupt the service;'],
          ['scrape, copy or resell applyspace or its content, or use it to build a competing service;'],
          ['use automated means to overload the service, or use it to send spam.'],
        ),
        p(
          'Job boards. When the desktop app searches a job board, it does so with your own session on that site, on your computer, on your behalf. You are responsible for respecting the terms of each job board you use, including any limits on automated access. If a job board restricts or suspends your account there, that is between you and the job board. Run searches at a reasonable pace and stop using a job board in applyspace if its terms do not allow it.',
        ),
        p('We may limit or suspend access if these rules are broken, as explained in Termination.'),
      ],
    },
    {
      id: 'your-content',
      heading: 'Your content',
      blocks: [
        p(
          'You own what you put in applyspace: your profile, resumes, notes, applications and other content. You give us only the permission we need to host, process and display it in order to run the service for you, for as long as it is in your account. We do not use your content to train AI models, and we do not sell it.',
        ),
        p(
          'Job offers saved to your account remain the property of their publishers. You may use them for your own job search only.',
        ),
      ],
    },
    {
      id: 'our-content',
      heading: 'Our software and brand',
      blocks: [
        p(
          'applyspace, its software, design and brand belong to us or our licensors. We give you a personal, non-exclusive, non-transferable right to use the web app and the desktop app for your own job search while these terms apply. Do not copy, modify or reverse-engineer them beyond what the law allows.',
        ),
      ],
    },
    {
      id: 'plans',
      heading: 'Plans and payment',
      blocks: [
        ul(
          ['applyspace has a free plan. Paid plans add features or higher limits, as described on the ', link('/pricing', 'Pricing'), ' page.'],
          ['Prices, features and billing period are shown before you subscribe. Payments are handled by ', field('paymentProvider'), '; we do not store your card details.'],
          ['Subscriptions renew automatically until you cancel. Cancelling stops the next renewal; you keep the paid features until the end of the period already paid.'],
          ['We may change prices or plans for the future. We will tell you before a change applies to your subscription, and you can cancel before it does.'],
          ['Your statutory rights as a consumer, including any right of withdrawal, are not affected.'],
        ),
      ],
    },
    {
      id: 'availability',
      heading: 'Availability',
      blocks: [
        p(
          'We work to keep applyspace available and your data safe, but we cannot promise that the service will be uninterrupted or error-free. We may pause it for maintenance, updates or security reasons, and we try to warn you in advance when we can. Features that depend on third parties, such as sign-in providers or job boards, may stop working when those services change.',
        ),
      ],
    },
    {
      id: 'liability',
      heading: 'Liability',
      blocks: [
        p(
          'To the extent the law allows, applyspace is provided “as is”. We are not responsible for hiring decisions, for the content of offers published by third parties, or for how job boards treat your account there. We are not liable for indirect losses, such as lost opportunities or lost income.',
        ),
        p(
          'Nothing in these terms limits our liability where the law does not allow it, including for gross negligence or intentional misconduct, or removes your statutory rights as a consumer.',
        ),
      ],
    },
    {
      id: 'termination',
      heading: 'Termination',
      blocks: [
        ul(
          [
            'You can stop using applyspace at any time and ask us to delete your account. Until account deletion is available in Settings, email ',
            field('contactEmail'),
            '.',
          ],
          [
            'We may suspend or close an account that seriously or repeatedly breaks these terms. Unless the law or urgency prevents it, we will tell you why first and give you a chance to respond.',
          ],
          ['When an account is closed, its data is deleted as described in the ', link('/privacy#retention', 'Privacy policy'), '.'],
        ),
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      blocks: [
        p(
          'We may update these terms as the product evolves. We will change the date at the top and, for important changes, tell you in the app or by email before they apply. If you do not agree, you can stop using applyspace and delete your account.',
        ),
      ],
    },
    {
      id: 'law',
      heading: 'Governing law and disputes',
      blocks: [
        p(
          'These terms are governed by French law. If you are a consumer living in another country, you keep the protection of the mandatory rules of that country.',
        ),
        p(
          'If you have a problem, contact us first at ',
          field('contactEmail'),
          ' and we will try to solve it. If you are a consumer, you can also refer the dispute free of charge to a consumer mediator: ',
          field('consumerMediator'),
          '. Otherwise, disputes go to the competent French courts.',
        ),
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      blocks: [p('Questions about these terms: ', field('contactEmail'), '. Postal address: ', field('registeredAddress'), '.')],
    },
  ],
};
