<template>
  <UCard :ui="{ body: 'grid grid-cols-3' }">
    <div class="text-center lg:col-span-1 col-span-3">
      Welcome to the ultimate app for tracking your dog's needs! Log your dog's
      activities, view detailed patterns in easy-to-read graphs, and share
      access with family or friends. Managing your dog's health has never been
      easier!
    </div>

    <USeparator
      orientation="vertical"
      class="h-full lg:visible invisible"
      label="SignIn"
    />

    <div class="space-y-4 flex flex-col justify-center">
      <UButton
        color="neutral"
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
        color="neutral"
        label="Login with Google"
        icon="i-simple-icons-google"
        block
        @click="
          client.auth.signInWithOAuth({
            provider: 'google',
          })
        "
      />
    </div>
  </UCard>
</template>
<script setup lang="ts">
const client = useSupabaseClient();
definePageMeta({
  layout: "login",
});
</script>
