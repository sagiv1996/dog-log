<template>
  <UCard>
    <template #header v-if="dogs?.length">
      <UAvatarGroup size="sm" :max="2">
        <UAvatar
          v-for="(profile, index) in connectProfileData"
          :key="index"
          :src="profile.avatar_url"
          :alt="profile.name"
        />
      </UAvatarGroup>
      <USelect v-model="selectedDog" :options="dogsOptions" />
      <UButton
        label="View graph"
        block
        size="xl"
        :to="`/dashboard?id=${selectedDog}`"
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
type DogAccess = Tables<"dog_access">;
const toast = useToast();

const {
  data: dogs,
  refresh,
  status: dogStatus,
} = await useFetch<DogRow[]>("api/dog");

const isOutDoors = ref<boolean>(true);
const dialogIsOpen = ref<boolean>(!dogs.value?.length);
const dogExcretionsIsLoading = ref<boolean>(false);
const selectedDog = ref(dogs.value?.[0]?.id);
const connectProfileData = computed(() => {
  return dogs.value
    ?.find((entry) => entry.id == selectedDog.value)
    ?.dog_access.map((da: DogAccess) => da.profile);
});

const isLoading = computed(() => {
  return dogStatus.value === "pending" || dogExcretionsIsLoading.value;
});

const dogsOptions = computed(() =>
  dogs.value?.map((d) => ({ label: d.name, value: d.id }))
);

const handleDogAdded = () => {
  dialogIsOpen.value = false;
  refresh();
  toast.add({ title: "Record Added" });
};
const handleClickTypeButton = async (selectedType: "poop" | "pee") => {
  dogExcretionsIsLoading.value = true;
  await useFetch("/api/dog-excretions", {
    method: "POST",
    body: {
      dog_id: selectedDog.value,
      location: isOutDoors.value ? "outdoors" : "indoors",
      type: selectedType,
    },
  });
  dogExcretionsIsLoading.value = false;
};
</script>
