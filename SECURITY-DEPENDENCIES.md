# Dependency security update (22 October 2026)

Use Node24.22.1 (`.nvmrc`) and the committed npm lock with `npm ci`. Original working copies are outside this patch. No deployment, store upload, production data operation or credential change is established by this source update.

Next and eslint-config-next use the matching15.5.28 release. The scoped Next PostCSS override follows the corrected direct PostCSS8 dependency; it changes no major API. React, application routes, database schema and business behavior are unchanged by source edits.

Known raw OSV findings include braces 3.0.3 (no published fixed version) and selector-parser 6.1.5. The parser finding is an advisory-range discrepancy: the official security-only major-6 backport is corrected. Keep the raw finding visible rather than forcing parser 7 into Tailwind 3.

The initial local comparison used317 cached public GHSA records. A subsequent OSV query checked the current public npm package names and exact lock versions; it confirmed the residuals above. Only public name/version pairs were sent, without private dependency edges or code. No-match results do not establish that every dependency or deployed artifact is vulnerability-free.

The maintainer's [selector-parser 6.1.5 release](https://raw.githubusercontent.com/postcss/postcss-selector-parser/6.1.5/CHANGELOG.md)
backports CVE-2026-104844 without changing the parser major. The scoped Typography
override changes only its exact 6.0.10 dependency to 6.1.5; Tailwind and application
versions stay unchanged. The official tarball integrity matches the installed
backport. OSV still reports the older `<7.1.6` range, so its raw finding is retained.

Before/after actual repository CSS was byte-identical, including ordered selectors,
declarations, variants, nested output and major-6 AST iteration behavior. Frozen
installs disable lifecycle scripts. The persistent ordinary compatibility command
is `node security/css-selector.contract.cjs`; it preloads I/O denial before the
actual Typography/Tailwind consumers. No stress or exploit input is part of it.
This build-tool patch does not change source features or deployed bundle references.
Fresh final-lock public OSV results and hosted CI remain separate publication gates.
