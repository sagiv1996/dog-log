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
          @click="onSubmit('pee')"
        />
        <div class="item-center">
          <UToggle
            on-icon="i-heroicons-sun"
            off-icon="i-heroicons-home"
            v-model="isOutDoors"
            size="2xl"
          />
        </div>
        <UButton
          label="poop"
          block
          size="large"
          class="action-button"
          @click="onSubmit('poop')"
        />
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { Tables } from "~/types/database.types";
type DogRow = Tables<"dog">;

const isOutDoors = ref<boolean>(true);
const client = useSupabaseClient();
const selectedDog = ref();
const {
  data: dogs,
  error,
  status,
} = await useFetch<DogRow[]>("api/dog", {
  onResponse: ({ response }) => {
    try {
      selectedDog.value = response._data[0].id;
    } catch (e) {
      console.warn("Dog are not found for this user");
    }
  },
});
const onSubmit = async (type: "poop" | "pee") => {
  const { data, error } = await useFetch("/api/dog-excretions", {
    method: "POST",
    body: {
      dog_id: 1,
      location: isOutDoors.value ? "outdoors" : "indoors",
      type,
    },
  });
  if (error.value) {
    console.error("Error creating record:", error.value);
  } else {
    console.log("Record created successfully:", data.value);
  }
};
</script>
