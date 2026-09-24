# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## Om dette projekt og hvordan vi arbejder sammen

**Om hjemmesiden:** Dette er hjemmesiden for **Nybrovej Dyreklinik**, en specialiseret smådyrsklinik i Kongens Lyngby. Klinikken behandler hunde, katte, kaniner og andre smådyr, og tilbyder bl.a. vaccinationer, neutralisering, tandbehandling (med egen tandklinik), hvalpepakker og hjerteorm-screening. Siden er bygget som ren, statisk HTML (ingen CMS eller database) og hostes gratis via GitHub Pages.

**Jeg koder ikke selv.** Jeg er ejer/bruger af klinikken og har ingen udviklerbaggrund. Al kode skrives og redigeres af Claude på mine vegne.

Når du (Claude) laver ændringer for mig, skal du:

- **Forklare ændringer kort og uden teknisk sprog.** Undgå fagudtryk som "commit", "branch", "CSS" osv. i forklaringer til mig, medmindre det er nødvendigt – beskriv i stedet *hvad der ændrer sig visuelt eller indholdsmæssigt* på siden.
- **Give mig mulighed for selv at tjekke ændringen**, før den går live. Det gør du ved at:
  1. Lave ændringen i en pull request på GitHub (ikke direkte på den live side)
  2. Hvis det er en visuel ændring, lave en forhåndsvisning jeg kan se (fx en artifact-preview eller et screenshot), så jeg kan se resultatet uden at skulle forstå kode
  3. Sende mig et link, så jeg selv kan godkende og merge, når jeg er tilfreds
- **Spørge mig, hvis noget er uklart** – fx hvis en tekstændring, et design-valg eller en teknisk detalje kræver at jeg beslutter noget, i stedet for at gætte.

**Til dig, der læser dette (fremtidig Claude-session):** Hvis der er noget om projektet, klinikken, eller vores arbejdsgang, du mangler for at kunne hjælpe bedst muligt, så spørg mig direkte, i stedet for at antage.
