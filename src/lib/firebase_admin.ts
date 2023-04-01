import { FIREBASE_SERVER_CONFIG } from "$env/static/private";
import admin, { type ServiceAccount } from "firebase-admin";

export function getFirebaseAdmin() {
    if (!admin.apps.length) {
        const serviceAccount = JSON.parse(
            FIREBASE_SERVER_CONFIG,
        ) as ServiceAccount;
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    return admin;
}
