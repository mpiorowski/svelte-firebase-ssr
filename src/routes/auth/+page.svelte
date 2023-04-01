<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { getFirebaseClient } from "$lib/firebase_client";
    import {
        signInWithPopup,
        GoogleAuthProvider,
        sendSignInLinkToEmail,
        isSignInWithEmailLink,
        signInWithEmailLink,
    } from "firebase/auth";

    const googleProvider = new GoogleAuthProvider();
    const auth = getFirebaseClient();

    async function sendIdToken(idToken: string): Promise<void> {
        try {
            const res = await fetch("/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idToken,
                }),
            });
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    async function signInWithGoogle() {
        try {
            const user = await signInWithPopup(auth, googleProvider);
            const idToken = await user.user.getIdToken();
            await sendIdToken(idToken);
            goto("/");
        } catch (err) {
            console.error(err);
        } finally {
            auth.signOut();
        }
    }

    let email = "";
    async function signInWithMagicLink() {
        try {
            await sendSignInLinkToEmail(auth, email, {
                url: "http://localhost:3000/auth",
                handleCodeInApp: true,
            });
            window.localStorage.setItem("emailForSignIn", email);
        } catch (err) {
            console.error(err);
        }
    }

    async function checkMagicLink(browser: boolean) {
        if (browser && isSignInWithEmailLink(auth, window.location.href)) {
            try {
                const email = window.localStorage.getItem("emailForSignIn");
                if (!email) {
                    console.error("No email found");
                    return;
                }
                const user = await signInWithEmailLink(
                    auth,
                    email,
                    window.location.href,
                );
                const idToken = await user.user.getIdToken();
                await sendIdToken(idToken);
                goto("/");
            } catch (err) {
                console.error(err);
            } finally {
                auth.signOut();
            }
        }
    }
    $: checkMagicLink(browser);
</script>

<div class="container">
    <button on:click={signInWithGoogle}>Sign In with Google</button>
    <input
        type="email"
        bind:value={email}
        placeholder="Enter your email address"
    />
    <button on:click={signInWithMagicLink}>Sign in with magic link</button>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>
