<template>
  <UCard>
    <template #header>
      <USelect
        v-model="selectedDog"
        :options="dogs"
        option-attribute="name"
        value-attribute="id" />
      <UButton label="View graph" block size="large" to="/dog"
    /></template>
    <UForm class="space-y-4">
      <div class="grid grid-cols-3 gap-6 justify-items-center">
        <UButton
          label="pee"
          block
          size="large"
          class="action-button"
          @click="handleClickTypeButton('pee')"
          :loading="isLoading"
          :disabled="!dogs.length"
        />
        <div class="item-center">
          <UToggle
            on-icon="i-heroicons-sun"
            off-icon="i-heroicons-home"
            v-model="isOutDoors"
            size="2xl"
            :loading="isLoading"
          />
        </div>
        <UButton
          label="poop"
          block
          size="large"
          class="action-button"
          @click="handleClickTypeButton('poop')"
          :loading="isLoading"
          :disabled="!dogs.length"
        />
      </div>
    </UForm>
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
import { Tables } from "~/types/database.types";
type DogRow = Tables<"dog">;
const toast = useToast();

const dialogIsOpen = ref(false);
const isOutDoors = ref<boolean>(true);
const selectedDog = ref();
const type = ref<"poop" | "pee">("pee");
const state = reactive({
  name: null,
});

const isLoading = computed(() => {
  return dogStatus.value === "pending" || dogExcretionsStatus.value === "pending";
});
const {
  data: dogs,
  refresh,
  status: dogStatus,
} = await useFetch<DogRow[]>("api/dog", {
  onResponse: ({ response }) => {
    try {
      selectedDog.value = response._data[0].id;
    } catch (e) {
      dialogIsOpen.value = true;
      console.warn("Dog are not found for this user");
    }
  },
});

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
