export const SITE_NAME = 'Prompt Scripter'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * The homepage title, which is deliberately not just the site name.
 *
 * Nobody searches for "Prompt Scripter" unless they already know it exists, so
 * a title that is only the brand can only ever be found by people who do not
 * need to find it. These are the words someone would actually type when they
 * have the problem this solves, and they fit inside the ~60 characters Google
 * shows before truncating.
 */
export const HOME_TITLE = 'Prompt Scripter — bulk prompts for ChatGPT, Claude & Gemini'

/**
 * Kept word-for-word in step with the Chrome Web Store description. It says
 * what the thing does — a prompt with blanks, a list, one run per row — rather
 * than which adjectives it deserves, and it names the three chats, which is
 * what someone looking for this would search by.
 */
export const DEFAULT_DESCRIPTION =
  'Write a prompt once with blanks, give it a list, and run the same prompt for every row — in ChatGPT, Claude or Gemini.'

export const CHROME_INSTALL_URL = process.env.NEXT_PUBLIC_CHROME_URL || '#'
