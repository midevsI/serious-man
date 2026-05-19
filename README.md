# Prompt to Claude (PTC)

PTC is **a local-first CLI for Claude Code workflows**.

PTC does not generate intelligence. It organizes intelligence.

## What PTC does

- Deterministic context compression
- Repo intelligence and structure extraction
- Developer memory management
- Prompt/context workflow continuity
- Claude-ready handoff block generation
- Token reduction through local deterministic processing

## Local-first guarantees

- No APIs
- No subscriptions
- No token usage
- No cloud dependency
- Fully local-first

## Install

```bash
bun install
```

## CLI

```bash
ptc init
ptc context
ptc compress
ptc prompt
ptc memory
ptc doctor
```

## Commands

### `ptc init`
Creates `.ptc/config.json` with deterministic workflow defaults.

### `ptc context`
Deterministic context infrastructure for:
- repo structure analysis
- dependency inspection
- git diff workflow hooks
- recent file detection
- architecture summary blocks
- project metadata extraction

### `ptc compress`
Deterministic compression infrastructure for:
- stripping comments
- removing blank lines
- collapsing repeated logs
- removing boilerplate
- preserving architecture-significant lines
- formatting clean Claude-ready handoff blocks

### `ptc prompt`
Manage reusable prompt assets locally.

### `ptc memory`
Manage persistent developer memory entries locally.

### `ptc doctor`
Checks only local workflow prerequisites:
- git
- bun
- node
- claude CLI
- repo state
- `.ptc` directory
- config integrity

## Architecture

```text
src/
  commands/
    init/
    context/
    prompt/
    notes/        # exports `memory` command
    compress/
    doctor/
  core/
    cli.ts
    command-loader.ts
    config/
    storage/
    logger/
  services/
  types/
  utils/
```

PTC is designed to feel like **git for Claude workflow context**: minimal, fast, deterministic, and developer-focused.
