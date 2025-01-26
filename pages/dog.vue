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
      searchable-placeholder="Search a dog..."
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
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton label="Add Dog" icon="i-heroicons-plus" />

          <template #panel>
            <create-new-dog @submit="handleDogAdded" />
          </template>
        </UPopover>
        <UButton
          @click="refresh"
          :loading="dogStatus === 'pending'"
          icon="i-heroicons-arrow-path"
          label="Refresh"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Tables } from "~/types/database.types";

type DogRow = Tables<"dog">;

const {
  data: dogs,
  refresh,
  status: dogStatus,
} = await useAsyncData<DogRow[]>("dogs", () => $fetch("/api/dog"));

const toast = useToast();
const selectedDog = computed(() =>
  dogs.value?.find((dog) => dog.id === selectedDogId.value)
);
const selectedDogId = ref<number>(dogs.value?.[0]?.id);
const items = [
  {
    slot: "viewGraph",
    label: "View graph",
    icon: "i-mdi-finance",
  },
  {
    slot: "addData",
    label: "Add Data",
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
  toast.add({ title: "Record Added" });
  const lastDog = dogs.value![dogs.value!.length - 1];
  selectedDogId.value = lastDog.id;
};
</script>
