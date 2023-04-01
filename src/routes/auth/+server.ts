import { getFirebaseAdmin } from "$lib/firebase_admin";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: Request }) {
    const body = (await request.json()) as { idToken: string | undefined };

    if (!body.idToken) {
        console.info("No idToken found");
        throw redirect(303, "/auth");
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const admin = getFirebaseAdmin();

    const sessionCookie = await admin
        .auth()
        .createSessionCookie(body.idToken, { expiresIn });

    const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    };

    const header = new Headers();
    header.append(
        "set-cookie",
        `session=${sessionCookie}; ${JSON.stringify(options)}`,
    );

    return new Response("auth", {
        status: 200,
        headers: header,
    });
}

/** @type {import('./$types').RequestHandler} */
export function DELETE() {
    const header = new Headers();
    header.append("set-cookie", `session=; Max-Age=0`);

    return new Response("auth", {
        status: 200,
        headers: header,
    });
}
