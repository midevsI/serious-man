# serious-man

`serious-man` is a fast, terminal-native developer workflow CLI built with Bun + TypeScript.

## Goals

- Productivity-first terminal experience
- AI-assisted workflow primitives
- Repo context intelligence foundations
- Prompt and notes management
- Plugin-ready architecture for future expansion

## Stack

- TypeScript
- Bun runtime
- Lightweight built-in command router (zero external deps)
- Bun-native terminal output

## Install

```bash
bun install
```

## Run

```bash
bun run start -- --help
bun run start -- init
```

## Build executable

```bash
bun run build
```

The package is configured with a `bin` map:

- `sm` -> `./dist/index.js`

Add more aliases later by extending the `bin` object in `package.json`.

## Commands (initial scaffolding)

- `sm init`
- `sm context`
- `sm prompt`
- `sm notes`
- `sm compress`
- `sm doctor`

## Environment variables

- `SM_LOG_LEVEL` (default: `info`)
- `SM_AI_PROVIDER` (default: `openai`)

## Architecture

```text
src/
  commands/
    init/
    context/
    prompt/
    notes/
    compress/
    doctor/
  core/
    command-loader.ts
    config/
    storage/
    logger/
    plugins/
  providers/
  services/
  types/
  utils/
```

This keeps command orchestration, core infrastructure, services, and provider abstractions separated and maintainable.

---

## Quick tutorial: using `serious-man` effectively

### 1) First-time setup in a repo

```bash
sm init
```

What this does:
- Creates a local `.serious-man/` folder in your current project.
- Stores default CLI config so future commands can build on it.

### 2) Check your environment health

```bash
sm doctor
```

Use this before deep workflow sessions. It confirms Bun version, active AI/provider env settings, and whether your `.serious-man` state directory exists.

### 3) Capture and inspect context

```bash
sm context
```

Current command is a placeholder, but this is the future entrypoint for repo awareness (branch state, changed files, summaries, and work snapshots).

### 4) Build a prompt workflow habit

```bash
sm prompt
```

Use this area as your future prompt library. Recommended pattern:
- store reusable system prompts
- version prompts by task (`review`, `refactor`, `test-plan`)
- keep prompts short and composable

### 5) Track development notes as artifacts

```bash
sm notes
```

Treat notes as lightweight project memory:
- bug breadcrumbs
- architectural decisions
- next-session TODOs

### 6) Compress context before sending to LLMs

```bash
sm compress
```

This command is scaffolded to become your context-compaction layer, where you can turn noisy repo state into token-efficient, high-signal prompts.

## Best-practice workflow loop

A practical daily loop:
1. `sm doctor`
2. `sm context`
3. `sm notes`
4. `sm prompt`
5. `sm compress`

That sequence gives you consistency: environment check -> context capture -> memory -> prompt assembly -> compact handoff to AI.
