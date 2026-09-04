# Changelog

What changed in each version of the Prompt Scripter extension for Chrome, newest first. Each line describes what the change means for someone using the extension rather than what was edited in the code.

**1.1.3 is the version the Chrome Web Store serves. Checked on 2026-09-04.** Chrome installs an update only while the extension is idle, so an install can sit on an older version for a few hours after a new one is published.

The date on each entry is the day that version was packaged. It is not the day the version was published, and no entry here records which version reached whom.

---

## 1.1.3 — 2026-09-02

- Your password manager can now fill in the sign-in form. Chrome would offer a saved login, but choosing it did nothing at all. That was our form's fault, not the browser's.
- Creating an account no longer makes your password manager offer to overwrite a password you had already saved for us.

Nothing else in this version is visible from the outside: the rest of it corrects our own release notes and internal task list, which had been describing work as pending days after it was done.

---

## 1.1.2 — 2026-09-02

- The free plan's monthly allowance of runs is now enforced. Reaching it used to report the limit without reliably stopping the run; the run now does not start.
- The message you see when you reach the limit says what happened and points at the upgrade button.
- The extension no longer writes its own running commentary into the browser's developer console while you work. Opening a chat page used to fill the console with dozens of lines of our logging. Warnings and real errors are still printed, so the console remains useful if something goes wrong and you want to report it.

---

## 1.1.1 — 2026-08-29

*This version was packaged but never published. Its submission never landed: it spent three days appearing to be queued without ever entering review, and 1.1.2 was uploaded over it rather than behind it. It has an entry here so the numbering has no unexplained gap. Everything listed in this entry is part of the extension from 1.1.2 onwards.*

- A strip at the top of the popup shows which plan you are on, and on the free plan how many of the month's runs you have used.
- On the free plan the strip offers an Upgrade button, which opens Stripe's checkout page for the account you are signed in as.
- If you already subscribe, the strip shows **Manage plan** instead, which asks Stripe for a link to its billing portal and opens it; if that request fails, the popup says so and gives the button back. Section 6 of the Terms names that portal as a way to cancel, and email to info@javieraguilar.ai as the other one. If the button does not get you there, use the email — it does the same thing.
- When your plan cannot be checked, the popup says so, instead of assuming you are on the free plan and offering to sell you something you may already pay for.
- When the extension updates while you have a chat open, that page now tells you its buttons have stopped working and greys them out, instead of leaving controls that look alive and do nothing. Reloading the page is the only way to get them back: the browser cuts an already-open page loose from the extension when it updates, and nothing we ship can reconnect it.
- The Save as Template button no longer appears on every entry of Claude's account menu, where the only thing it could ever save was a template full of menu text.
- View templates now appears in the actions menu of a chat in your Claude history, where it had never managed to work out which conversation it belonged to.

---

## 1.1.0 — 2026-08-27

*The first public version, packaged and submitted to the Chrome Web Store on this date. There are no earlier releases: the extension carried this number from the first day of the project and was never listed anywhere before this submission. What follows is what it does, not what changed.*

- Save a prompt as a template, leave blanks in it, and run it over a list of rows inside ChatGPT, Claude or Gemini.
- The popup and the on-page buttons are available in ten languages, and you can choose which language the popup uses.
- Naming a template and adding tags to it happen in a panel inside the page you are working on. Filling in a template's variables happens in the popup.
- On Gemini the buttons sit beside the chat box, and they follow the language of the page.
- Template names and tags appear in the popup's list exactly as you typed them, angle brackets and all.

---

## How this page is kept

Every version number that exists gets an entry, including a version that changed nothing you can see and a version that was never published. A number missing from this list would read as something being hidden, so the rule is to list it and say plainly what it did. Changes that only affect the code — how a request is routed, how the project is documented — are left out unless they changed something you can notice.

An entry is written before the version number is bumped, as part of preparing the release. A version whose entry is not written by then never gets one afterwards.

No entry carries an approval date. The single claim this page makes about what is published is the dated line at the top, and that line is re-checked and rewritten when a new version is confirmed as the one the store serves.
