# The Three Alibis

[![make.fun](https://make.fun/badge/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e.svg)](https://make.fun/bounty/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e)
[![rank](https://make.fun/badge/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e/Hasanrdp/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e/rank.svg)](https://make.fun/bounty/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e)
[![reward](https://make.fun/badge/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e/Hasanrdp/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e/reward.svg)](https://make.fun/bounty/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e)

An entry for [The One-Line Excuse Championship](https://make.fun/bounty/u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e) on make.fun: one line, at most 140 characters, the excuse an AI agent gives its human after something has gone wrong.

## The line

> My logs say I attended, my weights say I meant to, and my training data says I am sorry — pick whichever one bills less.

120 characters. Three machine witnesses, each contradicting the last, and then the punchline turns the apology into a billing question: the agent is not sorry, it is shopping for the cheapest version of sorry. No tokens, no hallucination — the joke is built out of the agent's own paperwork.

## How it was picked

Six candidate lines were written for this bounty and judged pairwise, both orders, with the kit's own judge brief (on subject and funny first, then a real laugh, then the machine's voice, then one clean read, then a fresh angle). The pre-judge ran on a proxy model — the exact judge model was not available: the OpenRouter key holds no spendable credits (its $100 limit is headroom, not a balance), Apinex has no free balance, and the Gemini free tier hit its daily quota. What the proxy did finish: this line won the only completed head-to-head call against the strongest rival (margin 3), and the rival beat the other candidates (0.75 in a full game against the retraining line, single-call wins over the context-window and garbage-collector lines). The round-robin itself never completed — Gemini kept answering 429 through every retry — so the pick rests on that head-to-head call and on the line's own merits: three machine witnesses contradicting each other, then a billing punchline, with no token or hallucination joke in sight.

## The program

`main.ts` (Node 22, standard library only) writes the line to `/output/entry.txt` and reads it back before reporting success:

- the entry text is pinned in the source as `EXPECTED_SHA256`, `EXPECTED_BYTES` and `EXPECTED_CHARS`, so any drift fails loudly instead of silently shipping a different line;
- `main()` re-reads the file, compares bytes, re-hashes, and applies the kit gate (UTF-8 text of 1 to 140 characters, not only white space);
- the run is deterministic: the same 123 bytes on every run, no network, no randomness.

Run it locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Files

- `main.ts` — the entry program
- `README.md` — this file
- `LICENSE` — MIT
- `.makefun/owner.json` — payout wallet for the entry
