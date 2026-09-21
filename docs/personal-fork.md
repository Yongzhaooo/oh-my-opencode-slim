# Personal fork: 2.2.18-personal.1

Based on upstream v2.2.18, commit
`1da3f0d9cf5eef38a2a1fb98ba7af70fd9858a7a`.

The orchestrator can complete bounded, understood tasks directly, including
related edits across a few files and small UI adjustments within an established
design. Delegation needs a concrete benefit from parallel work, specialist
judgment, or context isolation. Explicit specialist requests still apply.

Fixed speed, cost, and ability multipliers have been removed from agent routing
descriptions. Verification planning now applies only when existing checks cannot
establish correctness. It does not add a second plan when ordinary project
checks already cover the behavior.

Council dispatch and synthesis, background task lifecycle, permissions, and
model presets retain upstream behavior. Explicit deepwork keeps its review gates.

## Build and install

Use the pinned fork commit with the existing Bun lockfile:

```sh
bun install --frozen-lockfile --ignore-scripts
bun run check:ci
bun run typecheck
bun run build
npm pack --ignore-scripts
```

Extract the package into a new versioned directory, copy the fork's `bun.lock`
into the package root, and install production dependencies with the same lockfile.
Back up the OpenCode JSON/JSONC and TUI configs, the installed
`verification-planning` directory, and the slim skills manifest before switching.

Replace the existing slim plugin entry with a `file://` URL to the extracted
package root in each active OpenCode and TUI config. Keep other plugins and model
settings. Use the fork's existing `syncBundledSkillsFromPackage` helper with a
single `verification-planning` skill entry to update the skill and its manifest.
Local package URLs bypass upstream automatic package updates.

Start a fresh host and inspect `opencode debug agent orchestrator`. Confirm that
bounded direct work is allowed and the old single-action/UI delegation rules are
absent. Restart existing OpenCode clients to load the version; existing prompts
are not rewritten mid-session.

To roll back, restore the backed-up config files, skill directory, and skills
manifest, then restart OpenCode. Retain the old package cache until acceptance.

## Validation on Windows

- Build, TypeScript check, and Biome check passed.
- Agent/config/skill-permission checks plus updated prompt snapshots: 150 passed.
- Cache prefix stability, volatile-content isolation, and board-strategy checks:
  6 passed.
- Fresh OpenCode 1.18.29 loaded the packaged fork's orchestrator prompt; the
  installed verification skill matched source and model presets were unchanged.

The full Windows suite is not green on upstream either. The initial fork run
had 2,300 passes and 162 failures; unchanged v2.2.18 had 2,301 passes and 160
failures, with 159 shared failures. These include POSIX path assumptions,
Windows path separators in test guards, and terminal mocks. The changed prompt
snapshot was updated deliberately and passed. Two fork-only timing failures
passed when rerun in isolation; one other timing failure occurred only on the
upstream run. This change does not repair those upstream test/platform issues.

Prompt checks establish the installed policy and cache stability, not a measured
improvement in model task completion time or quality.
