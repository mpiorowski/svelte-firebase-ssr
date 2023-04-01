# Firebase authentication with SvelteKit SSR

## Demo
https://firebase-svelte-ssr.vercel.app

## Description

This template is using [Firebase Session Cookies](https://firebase.google.com/docs/auth/admin/manage-cookies) to set up authentication using SvelteKit node server.

- The `firebase client` is used only to sign in, send the id token to server and after that automatically sign out.
- The `firebase admin sdk` takes care of the authentication after that.
- Page protection is done in `hooks.server.ts`, which means that EVERY request is checked.

From the Google Docs:

This solution has several advantages over client-side short-lived ID tokens, which may require a redirect mechanism each time to update the session cookie on expiration:

- Improved security via JWT-based session tokens that can only be generated using authorized service accounts.
- Stateless session cookies that come with all the benefit of using JWTs for authentication. The session cookie has the same claims (including custom claims) as the ID token, making the same permissions checks enforceable on the session cookies.
- Ability to create session cookies with custom expiration times ranging from 5 minutes to 2 weeks.
- Flexibility to enforce cookie policies based on application requirements: domain, path, secure, httpOnly, etc.
- Ability to revoke session cookies when token theft is suspected using the existing refresh token revocation API.
- Ability to detect session revocation on major account changes.

## Missing environment variables

For local development You can create an .env file in root folder.

```
SERVICE_ACCOUNT='service account key object parsed as string'
PUBLIC_API_KEY='firebase client api key'
PUBLIC_AUTH_DOMAIN='firebase client auth domain'
```


