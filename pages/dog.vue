<template>
  <UCard class="h-screen">
    <profiles
      :profiles="accessProfiles"
      :selected-dog="selectedDog.id"
      @submit="refresh"
    />

    <USelectMenu
      v-model="selectedDog"
      :options="dogs || []"
      option-attribute="name"
      by="id"
    ></USelectMenu>
    <UTabs :items="items" class="w-full">
      <template #viewGraph="{ item }">
        <graph-excretions :graph-data="selectedDog.graph_view"
      /></template>
      <template #addData="{ item }">
        <add-excretions :selected-dog="selectedDog.id" @submit="refresh" />
      </template> </UTabs
    ><template #footer>
      <UPopover
        v-model:open="dialogAddDogIsOpen"
        overlay
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton label="Add Dog" icon="i-heroicons-plus" />

        <template #panel>
          <create-new-dog @submit="handleDogAdded" />
        </template> </UPopover
    ></template>
  </UCard>
</template>

<script setup lang="ts">
type DogRow = Tables<"dog">;
const {
  data: dogs,
  refresh,
  status: dogStatus,
} = await useFetch<DogRow[]>("api/dog");
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
  selectedDog.value.dog_access.map((d: DogRow) => d.profile)
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
