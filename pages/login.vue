<template>
  <UCard :ui="{ body: 'grid lg:grid-cols-3 grid-cols-1' }">
    <div class="text-center">
      {{ $t("welcome") }}
    </div>

    <USeparator
      orientation="vertical"
      class="h-full lg:visible invisible"
      label="SignIn"
    />

    <div class="space-y-4 flex flex-col justify-center">
      <UButton
        color="neutral"
        :label="$t('loginByGitHub')"
        icon="i-simple-icons-github"
        block
        @click="
          client.auth.signInWithOAuth({
            provider: 'github',
            options: {
              redirectTo,
            },
          })
        "
      />
      <UButton
        color="neutral"
        :label="$t('loginByGoogle')"
        icon="i-simple-icons-google"
        block
        @click="
          client.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo,
            },
          })
        "
      />
    </div>
  </UCard>
</template>
<script setup lang="ts">
const redirectTo = window?.location?.origin;
const client = useSupabaseClient();
const { t } = useI18n();
useHead({ title: t("loginPageTitle") });
</script>
