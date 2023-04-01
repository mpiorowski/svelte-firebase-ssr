import { initializeApp } from "firebase/app";
import { getAuth, setPersistence } from "firebase/auth";

export function getFirebaseClient() {
    /**
     * @type {import("firebase/auth").Persistence}
     */
    let persistance = { type: "NONE" };
    const firebaseConfig = {
        apiKey: "AIzaSyDPQa4lYBPcvpA4oI6Qm7nYwzg2M9m2z9Y",
        authDomain: "the-game-372723.firebaseapp.com",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    setPersistence(auth, persistance);
    return auth;
}
