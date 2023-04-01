# Firebase authentication with SvelteKit SSR

This template is using [Firebase Session Cookies](https://firebase.google.com/docs/auth/admin/manage-cookies) to set up authentication using SvelteKit node server.

From the Google Docs:

This solution has several advantages over client-side short-lived ID tokens, which may require a redirect mechanism each time to update the session cookie on expiration:

Improved security via JWT-based session tokens that can only be generated using authorized service accounts.
Stateless session cookies that come with all the benefit of using JWTs for authentication. The session cookie has the same claims (including custom claims) as the ID token, making the same permissions checks enforceable on the session cookies.
Ability to create session cookies with custom expiration times ranging from 5 minutes to 2 weeks.
Flexibility to enforce cookie policies based on application requirements: domain, path, secure, httpOnly, etc.
Ability to revoke session cookies when token theft is suspected using the existing refresh token revocation API.
Ability to detect session revocation on major account changes.
