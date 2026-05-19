# Prompt to Claude (PTC)

`prompt-to-claude` is a terminal-native CLI for Claude Code workflows, prompt/context infrastructure, developer memory, and repo intelligence.

## Focus

- Claude Code productivity workflows
- Repo-aware prompting and context infrastructure
- Developer memory management
- Context compression and token reduction
- Open-source-ready modular CLI architecture

## Stack

- TypeScript
- Bun runtime
- Lightweight internal command router
- Minimal terminal UX output for fast iteration

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

The package exposes:

- `ptc` -> `./dist/index.js`

## Commands

- `ptc init`
- `ptc context`
- `ptc compress`
- `ptc prompt`
- `ptc memory`
- `ptc doctor`

## Environment Variables

- `PTC_LOG_LEVEL` (default: `info`)
- `PTC_AI_PROVIDER` (default: `anthropic`)
- `ANTHROPIC_API_KEY` (required for real Anthropic integration)

## Architecture

```text
src/
  commands/
    init/
    context/
    prompt/
    notes/        # exposes the `memory` command
    compress/
    doctor/
  core/
    cli.ts
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

## Command Intent

### `ptc context`
Ready structure for:
- repo analysis
- recent file detection
- git diff analysis hooks
- dependency inspection hooks
- architecture summarization

### `ptc compress`
Ready structure for:
- repo summarization
- token reduction
- context cleanup
- Claude-ready output formatting

### `ptc doctor`
Validates:
- `git`
- `bun`
- `node`
- `claude` CLI installation
- `ANTHROPIC_API_KEY` presence
- `.ptc` local state directory

## Quick Start

1. `ptc init`
2. `ptc doctor`
3. `ptc context`
4. `ptc prompt`
5. `ptc memory`
6. `ptc compress`

PTC is designed to become a serious infrastructure tool for Claude Code power users.
