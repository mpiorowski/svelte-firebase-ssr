import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, type Persistence } from "firebase/auth";

export async function getFirebaseClient() {
    const persistance: Persistence = { type: "NONE" };
    const firebaseConfig = {
        apiKey: "AIzaSyDPQa4lYBPcvpA4oI6Qm7nYwzg2M9m2z9Y",
        authDomain: "the-game-372723.firebaseapp.com",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    await setPersistence(auth, persistance);
    return auth;
}
