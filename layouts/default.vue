<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold">Dog log</div>

          <UPopover v-if="user">
            <UAvatar :src="user.user_metadata.avatar_url" alt="Avatar" />

            <template #panel>
              <UButton
                color="black"
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

    <main class="container mx-auto">
      <slot />
    </main>

    <!-- <footer class="bg-gray-900 text-white">
      <div class="container mx-auto px-4 py-4 text-center">
        © 2024 Dog log. All rights reserved.
      </div>
    </footer> -->
    <UNotifications />
  </div>
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
