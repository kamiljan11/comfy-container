/**
 * Welcome email sequences — extracted from Systeme.io campaigns.
 *
 * Each sequence triggers when a subscriber opts in with the matching tag
 * (see `src/server/newsletter.ts` and `src/components/NewsletterSignup.tsx`).
 * Delays are relative to the previous email in the sequence.
 *
 * Body content TODO — paste from Systeme.io UI. Subject + delay are
 * extracted directly from the Systeme.io API (verified 2026-05-21).
 */

export interface SequenceEmail {
  subject: string
  delayDays: number
  body: string  // plain text; supports {{name}} and {{email}} placeholders
  html?: string // optional HTML version (override of body)
  /** Original Systeme.io step ID for traceability while migrating. */
  systemeStepId?: number
}

export interface WelcomeSequence {
  /** Subscriber tag that triggers this sequence. */
  tag: string
  /** Human-readable sequence name (for logging / UI). */
  name: string
  /** Original Systeme.io campaign ID (for reference). */
  systemeCampaignId: number
  emails: SequenceEmail[]
}

export const SEQUENCES: Record<string, WelcomeSequence> = {
  'dmt-subscriber': {
    tag: 'dmt-subscriber',
    name: 'DMT EMAILS',
    systemeCampaignId: 796469,
    emails: [
      { systemeStepId: 3506672, delayDays: 0, subject: 'Ready for DMT? ✅✅✅', body: 'TODO: paste body from Systeme.io email 12418779' },
      { systemeStepId: 3506673, delayDays: 2, subject: 'Benefits of DMT 💎💎💎', body: 'TODO: paste body from Systeme.io email 12418783' },
      { systemeStepId: 3506674, delayDays: 3, subject: "Let's Connect and Share 🙏🙏🙏", body: 'TODO: paste body from Systeme.io email 12418788' },
      { systemeStepId: 3506675, delayDays: 3, subject: 'Beyond the Session 🧩🧩🧩', body: 'TODO: paste body from Systeme.io email 12418790' },
      { systemeStepId: 3512337, delayDays: 3, subject: 'Vision for My Spirit Way—The Journey Ahead 🚀🚀🚀', body: 'TODO: paste body from Systeme.io email 12418792' },
      { systemeStepId: 3506677, delayDays: 3, subject: 'Ways You Can HELP ❤️❤️❤️', body: 'TODO: paste body from Systeme.io email 12418792' },
    ],
  },
  'iyss-subscriber': {
    tag: 'iyss-subscriber',
    name: 'Integrate Your Shattered Self',
    systemeCampaignId: 797321,
    emails: [
      { delayDays: 0, subject: 'Ready for Integration Session? 🔥🔥🔥', body: 'TODO: paste body' },
      { delayDays: 2, subject: 'Many Techniques in One Session 🦋🦋🦋', body: 'TODO: paste body' },
      { delayDays: 3, subject: 'Benefits of the Integration Session ✅✅✅', body: 'TODO: paste body' },
      { delayDays: 3, subject: 'Join Our Community Forum 🤝🤝🤝', body: 'TODO: paste body' },
      { delayDays: 3, subject: 'More Practical Tools 🎯🎯🎯', body: 'TODO: paste body' },
      { delayDays: 3, subject: 'My Biggest Dreams - MySpiritWay Vision 🚀🚀🚀', body: 'TODO: paste body' },
      { delayDays: 3, subject: 'The Ways You Can HELP 🙏🙏🙏', body: 'TODO: paste body' },
    ],
  },
  'sps-subscriber': {
    tag: 'sps-subscriber',
    name: 'Practical Spirituality for Modern People',
    systemeCampaignId: 870995,
    emails: [
      { delayDays: 0, subject: 'Hello and Welcome {{name}} 💖', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(2) Something to Relax and Reflect On', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(3) Meaningful Social Medias', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(04) Music', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(4) SBNR? (Spiritual But Not Religious)', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(05) Use of AI for growth and search', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(5) VR Mystery School', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(6) Cosmetics and Cleaning Products - what to be aware of', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(6) Healthy Lifestyle Simply', body: 'TODO: paste body' },
      { delayDays: 3, subject: '(6) Modular Yoga for Modern People', body: 'TODO: paste body' },
      { delayDays: 3, subject: '07 festivals in europe', body: 'TODO: paste body' },
    ],
  },
  'spiritual-marketing-subscriber': {
    tag: 'spiritual-marketing-subscriber',
    name: 'Practical Marketing (Useful Content) + Others',
    systemeCampaignId: 995806,
    emails: [
      { delayDays: 0, subject: 'Welcome to Spiritual Marketing ✨', body: 'TODO: paste body' },
      { delayDays: 2, subject: 'Is it really spiritual to charge for your work? 💸✨', body: 'TODO: paste body' },
      { delayDays: 3, subject: 'How to price spiritual work without guilt? 😬', body: 'TODO: paste body' },
      { delayDays: 3, subject: 'Your business is not a machine 🫀', body: 'TODO: paste body' },
      { delayDays: 3, subject: '7 gears that turn your spiritual work into stable income ⚙️❤️‍🔥', body: 'TODO: paste body' },
      { delayDays: 3, subject: 'How to get clients as a spiritual coach (even with a tiny audience) 🔍', body: 'TODO: paste body' },
    ],
  },
  'awakening-circle': {
    tag: 'awakening-circle',
    name: 'The Awakening Circle: Deep Spirituality',
    systemeCampaignId: 824521,
    emails: [
      { delayDays: 0, subject: 'You are about to dive Deeply Into Spirituality', body: 'TODO: paste body — single-email broadcast in original campaign.' },
    ],
  },
}

/**
 * Pick the right sequence for a subscriber based on their tag.
 * Falls back to a generic welcome sequence (main-page) if no match.
 */
export function sequenceForTag(tag: string | undefined): WelcomeSequence | undefined {
  if (!tag) return SEQUENCES['sps-subscriber'] // default to the SPS welcome
  return SEQUENCES[tag]
}
