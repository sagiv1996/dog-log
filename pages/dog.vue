<template>
  <UCard class="h-screen">
    <div class="flex justify-between items-center">
      <profiles
        :profiles="accessProfiles"
        :selected-dog="selectedDog.id"
        @submit="refresh"
        v-if="dogs?.length"
      />
      <USelectMenu
        v-model="selectedDog"
        :options="dogs || []"
        option-attribute="name"
        by="id"
        size="xl"
        v-if="dogs?.length"
      ></USelectMenu>
    </div>

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
} = await useAsyncData("dogs", async () => {
  const { data } = await client
    .from("dog")
    .select("*, graph_view(*), dog_access(*, profile!inner(*))");

  return data;
});
const toast = useToast();
const selectedDog = ref<DogRow>(dogs.value?.[0]);
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
  selectedDog.value = lastDog;
};
</script>
