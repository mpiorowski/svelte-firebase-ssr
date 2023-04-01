<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";

    export let data: PageData;

    async function onLogout() {
        try {
            await fetch("/auth", {
                method: "DELETE",
            });
            goto("/auth");
        } catch (err) {
            console.error(err);
        }
    }
</script>

<h1>Home</h1>
<button on:click={onLogout}>Logout</button>
<pre>{JSON.stringify(data, null, 2)}</pre>
