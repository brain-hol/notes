# Vite+

If you're familiar with the JavaScript ecosystem at all, you'll know it is kind of a mess. The language is nice and the community is pretty good at always trying to improve, but this has caused a huge amount of similar projects all trying to solve the same problems.

## History/Background

Modern JavaScript has an impressive standard library and common set of standards in general. You'll see things on MDN like "Baseline" and there are common terms like ES6, ES2020, etc. But a lot of the people at TriVir will remember a time when JavaScript was the wild west.

There are a lot of different projects or engineers that have contributed a lot, but one in particular deserves more credit than he gets in terms of unification and standard library. Jeremy Ashkenas. He is the author of libraries like `underscore.js`, `backbone.js`, and `CoffeeScript`.

His projects were so influential that most of them have been officially merged into the modern JavaScript specs and a lot of experienced JavaScript developers still reach for the libraries even though they have become mostly irrelevant.

This is part of why I make sure to call AIC scripts "RhinoScript" instead of JavaScript because it comes from a past era where the JavaScript ecosystem was terrible.

## Today's Problem

The problem now days is not a lack of standard library or specification, but instead comes from the fact that everything seems to be written in JavaScript. We now have server-side applications in JavaScript and even CLI applications like `frodo`.

The most common runtime for this is `node` but it's not the only one. We now have `node`, `bun`, `deno`, `Cloudflare Workers`, etc.

We also have multiple package managers between `npm`, `yarn`, `pnpm`. `deno` and `bun` also have their own package managers.

We also have multiple tools that require scaffolding like TypeScript, ESLint, Prettier.
