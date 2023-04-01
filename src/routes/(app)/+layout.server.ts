import type { LayoutServerLoad } from "./$types";

export const load = (({ locals }) => {
    return { userSession: locals.userSession };
}) satisfies LayoutServerLoad;
