# Environment variable management with Doppler

Environment variables are managed with Doppler. Running the `./tooling/scripts/doppler.sh` script will help you push/pull env variables between Doppler and local .env files. You will first need to [install the Doppler CLI](https://docs.doppler.com/docs/cli) and then run `doppler login` and `doppler setup`.

Usage:

```bash
# download all configs from Doppler to local .env files
pnpm doppler download

# Uploads the vars in .env.dev, .env.stg, and .env.prd files
pnpm doppler upload
```

TODO:

- valtio from Ray's Weather (with new valtio persist items)

NOTES:

- nextjs middleware can cause a lot of problems with dotenv-vault: https://github.com/vercel/next.js/discussions/39705

FORGOT PASSWORD

- The issue is that when you log in, you can't add measures to your shortlist because it doesn't see you have a session.
- I added a bunch of console logs to try to get identify where it is happening and I also started changing a bunch in the MDPgDrizzleAdapter.
- session is working after a hard refresh

NEED:

- Need to handle multiple lands for a measure
