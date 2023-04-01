import { FIREBASE_SERVER_CONFIG } from "$env/static/private";
import admin from "firebase-admin";

export function getFirebaseAdmin() {
    if (!admin.apps.length) {
        const serviceAccount = JSON.parse(FIREBASE_SERVER_CONFIG);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    return admin;
}
