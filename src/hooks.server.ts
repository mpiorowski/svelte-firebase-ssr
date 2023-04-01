import { getFirebaseAdmin } from "$lib/firebase_admin";
import { redirect, type Handle } from "@sveltejs/kit";
import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export const handle: Handle = async ({ event, resolve }) => {
    const now = performance.now();

    const session = event.cookies.get("session") ?? "";
    if (!session || session === "") {
        console.info("No session found");
        event.locals.userSession = undefined;
    } else {
        let decodedClaims: DecodedIdToken | undefined = undefined;
        try {
            const admin = getFirebaseAdmin();
            decodedClaims = await admin
                .auth()
                .verifySessionCookie(session, false);
        } catch (err) {
            console.error("Error verifying session cookie", err);
            event.locals.userSession = undefined;
        }
        if (!decodedClaims) {
            console.error("No decoded claims found");
            event.locals.userSession = undefined;
        } else {
            console.info("User session verified");
            const { uid, email } = decodedClaims;
            event.locals.userSession = { uid, email };
        }
    }

    if (event.url.pathname !== "/auth" && !event.locals.userSession) {
        throw redirect(303, "/auth");
    }

    console.debug(`Request took ${performance.now() - now}ms`);

    const result = await resolve(event, {
        transformPageChunk: ({ html }) => html,
    });
    return result;
};
