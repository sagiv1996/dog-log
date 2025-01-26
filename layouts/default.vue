<template>
  <UApp>
    <header>
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold">Dog log</div>
          <ClientOnly>
            <UDropdownMenu :items="items">
              <UButton
                label="Open"
                icon="i-lucide-menu"
                color="neutral"
                variant="outline"
              />
            </UDropdownMenu>
          </ClientOnly>
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
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
const items = ref([
  [
    {
      label: user.value?.user_metadata?.full_name,
      avatar: {
        src: user.value?.user_metadata?.avatar_url,
        alt: "a",
      },
      type: "label",
    },
  ],
  [
    {
      label: "Change theme",
      icon: "i-mdi-theme-light-dark",
      onSelect() {
        isDark.value = !isDark.value;
      },
    },
    {
      label: "logout",
      icon: "i-mdi-logout",
      onSelect() {
        client.auth.signOut();
      },
    },
  ],
]);
</script>
