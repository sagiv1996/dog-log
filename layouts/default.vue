<template>
  <UApp :locale="locales[locale]">
    <header>
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold">Dog log</div>
          <ClientOnly>
            <UDropdownMenu :items="items">
              <UButton
                :label="$t('open')"
                icon="i-lucide-menu"
                color="neutral"
                variant="outline"
              />
              <template #avatar-profile v-if="user">
                <UAvatar :src="user.user_metadata?.avatar_url" />
                {{ user.user_metadata?.full_name }}
              </template>
              <template #item-label="{ item }">
                {{ $t(item.label) }}
              </template>
            </UDropdownMenu>
          </ClientOnly>
        </div>
      </div>
    </header>
    <NuxtPwaManifest />
    <NuxtPage />
  </UApp>
</template>
<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { setLocale, locale } = useI18n();
const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
});
const client = useSupabaseClient();
const user = useSupabaseUser();
const localePath = useLocalePath()

watch(user, async () => {
  if (!user.value) {
    await navigateTo(localePath("/login"));
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
      slot: "avatar-profile",
    },
    {
      label: "changeTheme",
      icon: "i-mdi-theme-light-dark",
      onSelect() {
        isDark.value = !isDark.value;
      },
    },
    {
      label: "changeLang",
      icon: "i-mdi-translate",
      onSelect() {
        setLocale(locale.value === "en" ? "he" : "en");
      },
    },
    {
      label: "logout",
      icon: "i-mdi-logout",
      onSelect() {
        client.auth.signOut();
      },
      disabled: !user.value,
    },
  ],
]);
</script>
