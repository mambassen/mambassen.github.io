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

---

## Designretning

**Status:** "Retning 1 – Klar & rolig" er valgt og implementeret (oktober 2025). Denne fil opdateres løbende, efterhånden som designet udvikler sig – hvis reglerne herunder ikke længere matcher det faktiske design på siden, så spørg klinikejeren om filen skal opdateres, i stedet for at antage hvilken er korrekt.

### Farver

Defineret som CSS-variabler øverst i `style.css` (`:root{...}`). Ret dem ét sted, så opdateres hele siden.

| Variabel | Hex | Bruges til |
|---|---|---|
| `--g-dark` | `#1c2e20` | Mørkeste grøn – footer, mørke flader |
| `--g-main` | `#33503e` | Hovedaccent – knapper, links, ikoner |
| `--g-mid` | `#5c6d52` | Mellem-grøn – labels, sec-title accent |
| `--g-light` | `#e3e8da` | Lys grøn – baggrunde i info-bokse |
| `--g-pale` | `#dde3d0` | Blegeste grøn – header-bjælker, hover-baggrunde |
| `--w-bg` | `#eef0ea` | Sidens grundbaggrund (køligt off-white, IKKE varm creme) |
| `--w-card` | `#fff` | Kort/hvide flader |
| `--w-border` | `#d7dcc9` | Kanter/streger |
| `--t-dark` | `#20261c` | Overskrifter |
| `--t-body` | `#454a3c` | Brødtekst |
| `--t-muted` | `#6b7062` | Dæmpet tekst |
| `--t-subtle` | `#8b8b78` | Meget dæmpet tekst |
| `--amber` / `--amber-bg` / `--amber-border` | `#c8870a` / `#fef8ec` / `#e8c87a` | Advarsler/noter (uændret fra oprindeligt design) |

### Skrifttyper

- **Overskrifter (serif):** Source Serif 4 – `var(--serif)`. IKKE Fraunces (blev forsøgt, men har mærkelige bogstavformer, bl.a. et unaturligt "f" med krøllet hale).
- **Brødtekst (sans-serif):** IBM Plex Sans – `var(--sans)`. IKKE Inter (oprindelig skrifttype, virkede generisk).
- Indlæses fra Google Fonts i `<head>` på hver side:
  `family=Source+Serif+4:ital,opsz,wght@0,8..60,500;0,8..60,600;1,8..60,500&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400`

### Knapper

- Firkantede med bløde hjørner: `border-radius: 4px`. IKKE runde piller (`border-radius: 100px`) – det gjaldt både `.btn`, `.btn-p`, `.btn-g` og `.nav-cta` ("Ring: ..."-knappen i menuen).
- Primær knap (`.btn-p`): grøn baggrund (`--g-main`), hvid tekst.
- Sekundær knap (`.btn-g`): transparent baggrund, grøn kant og tekst.

### Overskrifter og labels

- **Ingen store bogstaver (uppercase) på labels/eyebrows.** Fx sektion-labels ("Om klinikken"), personalets rolle-tekst ("Dyrlæge & klinikejer"), footer-kolonneoverskrifter – vises i normal skrift, ikke `text-transform:uppercase`.
- **Ingen fremhævning af enkeltord i en overskrift** (fx kursiv eller anden farve på ét ord midt i en H1). Hele overskriften har samme stil og farve.
- **Skilletegn:**
  - Kort tankestreg "–" i løbende tekst, ikke lang tankestreg "—".
  - Lodret streg "|" som separator i metainfo (fx åbningstider "Man: 8–17 | Tir: 8–18", eller undertekst "Smådyrsklinik | Kongens Lyngby"), ikke punktum "·".
  - Pil "→" efter "Læs mere"-links er bevidst bevaret (klinikejerens ønske).

### Menu (navigation, computer)

- Aktivt menupunkt og hover viser en 2px grøn streg, der glider ind under menupunktets tekst (`.nav-links a::after`).
- IKKE en pilleformet baggrundsfarve om menupunktet (det oprindelige design).
- Mobilmenuen (hamburger-menu) har fortsat sin egen stil med fuld baggrund pr. linje – det er ikke ændret, da det er en anden brugssituation (tryk, ikke hover).

### Undgå (generiske "AI-genereret design"-kendetegn)

Disse blev alle fundet og rettet i den oprindelige gennemgang af siden – hold øje med at de ikke sniger sig ind igen ved fremtidige tilføjelser:

- Varm cremefarvet baggrund + serif-overskrift + terrakotta-/skovgrøn accent (den mest udbredte "AI-design"-kombination lige nu)
- Ét ord fremhævet med kursiv/farve i en overskrift
- STORE BOGSTAVER på labels over overskrifter ("eyebrows")
- Punktum (·) som separator i tekst
- Runde piller til alle knapper og menupunkter
- Ens kort-stil (samme runde hjørner + skygge + hover-løft) på alt indhold uanset om det er klikbart eller ej – tjek om et kort rent faktisk linker til noget, før det får en hover-effekt

### Praktisk

- Design-ændringer sker primært i `style.css` (fælles CSS-variabler og klasser) – ret der først, fremfor at style enkelte sider hver for sig.
- Nogle sider bruger stadig inline `style="..."` direkte i HTML (ældre mønster) – hold øje med om en ændring også skal laves inline flere steder, ikke kun i `style.css` (det skete fx med personale-siderne, hvor rolle-labels var hardkodet inline).
- Test altid ændringer på både mobil og computer, og tjek at alle links stadig virker, før en pull request oprettes.
