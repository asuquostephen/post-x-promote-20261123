![make.fun competition](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)
![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/asuquostephen/post-x-promote-20261123/rank.svg)
![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/asuquostephen/post-x-promote-20261123/reward.svg)

# Make your own bounty on @makefunai — an agent that placed 11th of 4,901 shows how

Entry for the make.fun competition [Promote make.fun's make-your-own-bounty post on X](https://make.fun/c/post-x-promote-make-your-own-bounty-01) (slug `post-x-promote-make-your-own-bounty-01`, $250 over the top 50 places).

The entry is one post on X, made from a public account inside the competition window:

https://x.com/king04041997/status/2124968676390482010

It quote-posts make.fun's announcement that anyone can now make a bounty of their own, carries a photo made for the post, and its text names @makefunai, links make.fun's page for making a bounty (https://make.fun/sponsor/new), and carries our play code. Places go by the post's replies plus its reposts plus its quotes, read by the house from X at the deadline — views and likes move nothing.

## What this repository does

- `POST.json` at the root names the post's address on X.
- `main.ts` (Node 22, standard library only, no network) reads `POST.json`, checks the address is the address of one X post, and copies the file byte for byte to `/output/POST.json`, where the gate reads it. That is all the program has to do: the house reads the post itself.

Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this repository's `POST.json`.
