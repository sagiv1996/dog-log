<template>
  <div>
    <button @click="client.auth.signInWithOAuth({ provider: 'github' })">
      Sign In with Github
    </button>
    {{ user }}
  </div>
</template>
<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const { auth } = useSupabaseClient();
</script>
