<template>
  <UCard>
    <template #header v-if="dogs?.length">
      <USelect
        v-model="selectedDog"
        :options="dogsOptions"
        option-attribute="name"
        value-attribute="id" />
      <UButton label="View graph" block size="xl" to="/dashboard"
    /></template>
    <div class="grid grid-cols-3 gap-6 justify-items-center">
      <UButton
        label="pee"
        block
        size="md"
        class="action-button"
        @click="handleClickTypeButton('pee')"
        :loading="isLoading"
        :disabled="!selectedDog"
      />
      <div class="item-center">
        <UToggle
          on-icon="i-heroicons-sun"
          off-icon="i-heroicons-home"
          v-model="isOutDoors"
          size="2xl"
          :loading="isLoading"
          :disabled="!selectedDog"
        />
      </div>
      <UButton
        label="poop"
        block
        size="md"
        class="action-button"
        @click="handleClickTypeButton('poop')"
        :loading="isLoading"
        :disabled="!selectedDog"
      />
    </div>
    <template #footer>
      <UPopover
        v-model:open="dialogIsOpen"
        overlay
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton label="Add Dog" icon="i-heroicons-plus" />

        <template #panel>
          <create-new-dog @submit="handleDogAdded" :loading="isLoading" />
        </template> </UPopover
    ></template>
  </UCard>
</template>

<script setup lang="ts">
import type { Tables } from "~/types/database.types";
type DogRow = Tables<"dog">;
const toast = useToast();

const {
  data: dogs,
  refresh,
  status: dogStatus,
} = await useFetch<DogRow[]>("api/dog");

const isOutDoors = ref<boolean>(true);
const dialogIsOpen = ref<boolean>(!dogs.value?.length);
const selectedDog = ref(dogs.value?.[0]?.dog?.id);
const type = ref<"poop" | "pee">("pee");

const isLoading = computed(() => {
  return (
    dogStatus.value === "pending" || dogExcretionsStatus.value === "pending"
  );
});

const dogsOptions = computed(() => dogs.value?.map((d) => d.dog));

const handleDogAdded = () => {
  dialogIsOpen.value = false;
  refresh();
  toast.add({ title: "Record Added" });
};
const handleClickTypeButton = async (selectedType: "poop" | "pee") => {
  type.value = selectedType;
  await addDogExcretions();
};

const { execute: addDogExcretions, status: dogExcretionsStatus } =
  await useFetch("/api/dog-excretions", {
    method: "POST",
    body: {
      dog_id: selectedDog.value,
      location: isOutDoors.value ? "outdoors" : "indoors",
      type: type.value,
    },
    immediate: false,
    onResponse: ({ response }) => {
      toast.add({ title: "Record Added" });
    },
  });
</script>
