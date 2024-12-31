<template>
  <UCard>
    <template #header> Add row {{ date }}, {{ status }}</template>
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
      <UButton label="Submit" block size="large" type="submit" />
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOutDoors = ref<boolean>(true);
const client = useSupabaseClient();
const onSubmit = async (type: "poop" | "pee") => {
  // const { date, error } = await client.from("dog_excretions").insert({
  //   dog_id: 1,
  //   location: isOutDoors.value ? "outdoors" : "indoors",
  //   type,
  // });
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
