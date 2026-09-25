# Changelog

What changed in each version of the Prompt Scripter extension for Chrome, newest first. Each line describes what the change means for someone using the extension rather than what was edited in the code.

**1.1.7 is the version the Chrome Web Store serves. Checked on 2026-09-25.** Chrome installs an update only while the extension is idle, so an install can sit on an older version for a few hours after a new one is published.

The date on each entry is the day that version was packaged. It is not the day the version was published, and no entry here records which version reached whom.

---

## 1.1.8 — 2026-09-25

**Prompt Scripter works on ChatGPT's new layout.** ChatGPT is gradually switching people to a redesigned page, the one with a Chat / Work switch at the top. On it, 1.1.7 showed no buttons at all, and a list could not run: each row was sent, but the extension never recognised the answer, so it waited on every row and the results came out empty. It now finds the chat box and reads the answers on both the old page and the new one. This was checked on the live site: three rows sent, three answers captured, in 24 seconds.

---

## 1.1.7 — 2026-09-23

**The buttons are back on ChatGPT.** Since 1.1.6 the extension could open ChatGPT and not show Templates or Save as Template at all. The change that kept the buttons off Claude's settings pages also asked every chat box to prove it was a chat box, and ChatGPT's empty composer carries nothing that proves it: its label reads "Chatear con ChatGPT" and there is no send button until you type. The extension now recognises ChatGPT's composer by the name ChatGPT itself gives it. This was checked on the live site with a loop run end to end.

**Claude's routine editor and Gemini's Gem editor are treated as editors, not chats.** The buttons stay there on purpose. You can save a routine's or a Gem's instructions as a template, or insert a template into them. What no longer happens is a list running in them: nothing on those pages sends a message, so a loop could only type rows into the instructions. Pressing Run on one of them now says so, and nothing is created or counted against your runs.

**On Gemini's Gem editor the buttons no longer cover the instructions.** They were drawn on top of the first line of the text. They now sit under the box.

---

## 1.1.6 — 2026-09-10

**The buttons no longer show up on Claude's settings pages.** Templates and Save as Template were being drawn on pages with no conversation on them at all. On the organization settings page they landed inside the team-name row, right beside the field that holds the name of your team.

Two mistakes in a row put them there. The extension checked which site it was on but never which page, so a settings page was prepared exactly like a chat. Then, looking for the box you type into, it settled on the only large text field on that page — the one for instructions that apply to the whole organization — and took it for the chat composer. The buttons ended up somewhere else again: attached to the first form on the page, which holds the team's name and does not contain that text field. That is why the result looked arbitrary rather than merely misplaced — what triggered the detection and what received the buttons had nothing to do with each other.

What is worth knowing beyond the appearance: with a settings field mistaken for the composer, the extension reported itself ready to work on a page where there is nothing to send. Anything that types on your behalf — a loop, above all — was being aimed at a configuration field.

On a chat nothing moves. The buttons go exactly where they went before, which was checked side by side against the published version rather than assumed.

---

## 1.1.5 — 2026-09-09

**You can now use the extension without an account.** Opening it for the first time asks how you want to start: sign in, or continue without one.

- Choosing to continue without an account says, before you decide, what you give up: your loop runs are not recorded, so there is no run history and no CSV when a loop finishes, and the templates you write stay in this browser only — they are not synced, and they go when the extension does.
- Signing in later does not upload what you wrote as a guest. It stays in this browser, and it comes back if you sign out.
- Without an account you get the same limits as the free plan — 10 templates, 20 loop runs a month, 200 rows per list — counted in this browser. An account is where a plan means something.
- Until this version, opening the popup without a session showed `Not authenticated` where the templates go. There was no way to use the extension at all without creating an account first.

**Gemini works again.** Not one row of a loop was reaching it: the extension was pressing the wrong button on the page — first its own, then Gemini's sidebar toggle — because it looked for a send button by its English label and the interface was in Spanish. It now finds the composer's button whatever language the page is in. Answers from Gemini are captured again too.

**Signing in and signing up are much faster.** Opening the extension with an account took two seconds before you saw your templates; it now takes about half. Signing up took nearly three seconds and now takes under half a second. Both were doing work that was not needed: one extra request each, and every request was travelling to a server on the wrong side of the Atlantic from the database.

**Your results now say whether each answer was seen to finish.** The exported CSV has two new columns: one saying `yes`, `no` or `unknown` for every row, and one saying why when the answer is `no`.

This matters because of what used to happen silently. If you left the tab in the background — which is what "start it and walk away" invites you to do — the page stops updating the answer, and the loop could file a third of a reply as if it were the whole thing. The run still finished green and nothing said otherwise. The same goes for an answer opened in ChatGPT's editor, which takes the text out of the chat and leaves only the introduction behind.

None of that is fixed by these columns; what changes is that you can now see which rows to check instead of reading all of them. Rows from runs made before this version say `unknown`, because nobody measured them either way.

**Smaller things you would have noticed:**

- Without an account, the header offered to "Log out" while the line beside it said you were not signed in. It now offers to sign in, which is what you actually want from there — and it was the only way to reach the sign-in form at all.
- Signing out now takes you back to the first screen instead of to the password field, so the templates you wrote without an account are one click away instead of three.
- When a loop cannot start because the page was open before the extension was installed or updated, it no longer spends one of your monthly runs. The message asks you to reload the tab and try again; following that advice used to cost a run each time.
- The message you get when you reach a limit without an account no longer tells you to upgrade to Pro, which you cannot do without an account in the first place.
- Saving a template from a chat no longer copies the words "You said" or the question twice into it.
- The tooltip on the extension's icon is fully translated — it used to leave English words in the middle of it.
- A cell holding `$&`, `` $` `` or `$$` — a price range, say — now reaches the chat exactly as written.
- Pasting a list with one column when the template needs two is refused before anything is sent, instead of quietly sending the same prompt on every row.

---

## 1.1.4 — 2026-09-04

- The strip at the top of the popup now shows what you have used against what your plan allows: templates, runs this month, and the largest list you can send in one go. That last number used to appear only when an upload was refused, which is the worst moment to learn a limit exists.
- A new **Account** section in the popup. **Download my data** gives you one file with your templates, your saved values, your datasets and your runs.
- **Delete account** removes your account and everything in it, permanently. You confirm with your password, and if you have a subscription it is cancelled as part of the same action. There is no undo, and the popup says so before it asks.

Both of those were already promised in Sections 2 and 11 of the Terms, and until this version the only way to get either was to write to us and wait for a reply.

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
