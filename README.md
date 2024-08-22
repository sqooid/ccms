# CCMS - Cloudflare pages CMS

## Development

To start the dev server such that wrangler such that D1 bindings are emulated locally, in two separate terminals run:

```sh
pnpm start:watch
```

and

```sh
pnpm start:wrangler
```

To set up the local development D1 instance, run:

```sh
pnpm drizzle:push
```

## Deployment to CF pages

### Environment variables

Set values for all the variables shown in `.dev.vars`.
Then so that the production D1 instance schema is always up-to-date, include `pnpm drizzle:migrate` in the build command, e.g.:

```sh
npm i -g pnpm && pnpm drizzle:migrate && pnpm build
```
