# Replace the live 2024 spell set for app version 2.3.0

The live 2024 file was replaced in place, directly and without a `/spells-test` stage, with the
maintainer's 2026-10-23 build (965 spells, up from 938). The app-version gate on the live set was
cleared by the maintainer confirming that app version 2.3.0 ("Custom Spells and many more!") is out
and supports the new file.

## Consequences

- The new file adds 33 spells from source `AU`.
- It drops 6 spells that the previous 2024 file carried: `LLK` (3), `TDCSR` (2) and `AitFR-AVT` (1).
  This is deliberate. Those spells remain available in the live Partnered file, so their absence
  from 2024 is not a regression to fix.
