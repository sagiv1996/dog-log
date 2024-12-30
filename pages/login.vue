<template>
  <UCard :ui="{ body: { base: 'grid grid-cols-3' } }">
    <div class="text-center">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, qui.
      Ratione, corrupti est eum suscipit molestiae quo cum velit doloribus
      fugiat omnis illo quisquam perspiciatis reiciendis aut ab, laboriosam qui.
    </div>

    <UDivider label="SignIn" orientation="vertical" />

    <div class="space-y-4 flex flex-col justify-center">
      <UButton
        color="black"
        label="Login with GitHub"
        icon="i-simple-icons-github"
        block
        @click="
          client.auth.signInWithOAuth({
            provider: 'github',
          })
        "
      />
      <UButton
        color="black"
        label="Login with Google"
        icon="i-simple-icons-google"
        block
        disabled
      />
      <UButton
        color="black"
        label="Login with OTP"
        icon="i-simple-icons-maildotru"
        block
        @click="
          client.auth.signInWithOtp({
            email: 'sagivb13@gmail.com',
          })
        "
      />
      <UButton
        color="black"
        label="Log-ot"
        icon="i-simple-icons-personio"
        block
        @click="client.auth.signOut()"
      />
    </div>
  </UCard>
</template>
<script setup lang="ts">
const client = useSupabaseClient();
</script>
