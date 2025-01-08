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
      :options="dogs || []"
      size="xl"
      icon="material-symbols:sound-detection-dog-barking-outline"
      value-attribute="id"
      option-attribute="name"
      searchable
      searchable-placeholder="Search a dog..."
    >
      <template #option-create="{ option }">
        <span class="flex-shrink-0">New label:</span>
        <span class="flex-shrink-0 w-2 h-2 mt-px rounded-full -mx-1" />
        <span class="block truncate">{{ option }}</span>
      </template></USelectMenu
    >

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
const client = useSupabaseClient();

const {
  data: dogs,
  refresh,
  status: dogStatus,
} = await useAsyncData<DogRow[]>("dogs", async () => {
  const { data } = await client
    .from("dog")
    .select("*, graph_view(*), dog_access(*, profile!inner(*))");

  return data || [];
});
const toast = useToast();
const selectedDog = computed(() =>
  dogs.value?.find((dog) => dog.id === selectedDogId.value)
);
const selectedDogId = ref<number>(dogs.value?.[0]?.id);
const items = [
  {
    slot: "viewGraph",
    label: "View graph",
  },
  {
    slot: "addData",
    label: "Add Data",
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
