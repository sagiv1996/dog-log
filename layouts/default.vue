<template>
  <UApp>
    <header class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold">Dog log</div>

          <UPopover>
            <UAvatar :src="user!.user_metadata.avatar_url" alt="Avatar" />

            <template #content>
              <UButton
                label="Logout"
                icon="i-simple-icons-personio"
                block
                @click="client.auth.signOut()"
              />
            </template>
          </UPopover>
        </div>
      </div>
    </header>
    <NuxtPage />
  </UApp>
</template>
<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
watch(user, async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});
</script>
