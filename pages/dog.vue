<template>
  <UCard class="h-screen">
    <profiles
      :profiles="accessProfiles"
      :selected-dog="selectedDog.id"
      @submit="refresh"
      v-if="dogs?.length"
    />
    <USelectMenu
      v-model="selectedDogId"
      :items="dogs"
      size="xl"
      icon="material-symbols:sound-detection-dog-barking-outline"
      searchable
      value-key="id"
      label-key="name"
      :searchable-placeholder="$t('searchADog')"
      :loading="dogStatus === 'pending'"
      class="w-full"
    ></USelectMenu>

    <UTabs :items="items" class="w-full">
      <template #viewGraph="{ item }" v-if="selectedDog?.graph_view">
        <graph-excretions :graph-data="selectedDog.graph_view"
      /></template>
      <template #addData="{ item }" v-if="selectedDog?.id">
        <add-excretions :selected-dog="selectedDog.id" @submit="refresh" />
      </template> </UTabs
    ><template #footer>
      <div class="flex justify-between items-center">
        <UPopover
          v-model:open="dialogAddDogIsOpen"
          overlay
          :content="{ side: 'right', align: 'start' }"
        >
          <UButton label="Add Dog" icon="i-heroicons-plus" />

          <template #content>
            <create-new-dog @submit="handleDogAdded" />
          </template>
        </UPopover>
        <UButton
          @click="refresh"
          :loading="dogStatus === 'pending'"
          icon="i-heroicons-arrow-path"
          :label="$t('refresh')"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Tables } from "~/types/database.types";

type DogRow = Tables<"dog">;
const { t } = useI18n();

const { data: dogs, refresh, status: dogStatus } = await useFetch("/api/dog");
const toast = useToast();
const selectedDog = computed(() =>
  dogs.value?.find((dog) => dog.id === selectedDogId.value)
);
const selectedDogId = ref<number>(dogs.value?.[0]?.id);
const items = [
  {
    slot: "viewGraph",
    label: t("viewGraph"),
    icon: "i-mdi-finance",
  },
  {
    slot: "addData",
    label: t("addData"),
    icon: "i-mdi-cable-data",
  },
];

const accessProfiles = computed(() =>
  selectedDog.value?.dog_access?.map((d: DogRow) => d.profile)
);
const dialogAddDogIsOpen = ref(!dogs.value?.length);

const handleDogAdded = async () => {
  dialogAddDogIsOpen.value = false;
  await refresh();
  toast.add({ title: t("successMessage") });
  const lastDog = dogs.value![dogs.value!.length - 1];
  selectedDogId.value = lastDog.id;
};
</script>
