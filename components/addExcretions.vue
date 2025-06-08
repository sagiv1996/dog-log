<template>
  <div class="grid grid-cols-2 gap-6 justify-items-center">
    <USwitch
      unchecked-icon="i-heroicons-home"
      checked-icon="i-heroicons-sun"
      default-value
      v-model="isOutDoors"
      :loading="isLoading"
      :disabled="!selectedDogId"
      size="xl"
      aria-label="indoors or outdoors"
    />
    <date-picker v-model="date" />
    <UButton
      :label="$t('pee')"
      block
      size="md"
      @click="handleClickTypeButton('pee')"
      :loading="isLoading"
      :disabled="!selectedDogId"
      aria-label="is pee"
    />

    <UButton
      :label="$t('poop')"
      block
      size="md"
      @click="handleClickTypeButton('poop')"
      :loading="isLoading"
      :disabled="!selectedDogId"
      aria-label="is poop"
    />
  </div>
  <latest-excretion
    v-if="excretionStatus === 'success'"
    :excretions="excretions"
    class="mt-4"
  />
</template>
<script setup lang="ts">
const { t } = useI18n();
const emit = defineEmits(["submit"]);
const { selectedDogId } = defineProps<{
  selectedDogId: number;
}>();
const date = ref<Date>(new Date());
const toast = useToast();
const isOutDoors = ref<boolean>(true);
const isLoading = ref(false);
onActivated(() => {
  date.value = new Date();
});
const handleClickTypeButton = async (selectedType: "poop" | "pee") => {
  isLoading.value = true;
  const { data, error } = await useFetch("/api/dog-excretions", {
    method: "POST",
    body: {
      dog_id: selectedDogId,
      location: isOutDoors.value ? "outdoors" : "indoors",
      type: selectedType,
      date: date.value,
    },
  });
  if (error.value) {
    toast.add({ title: t("errorMessage") });
  }
  toast.add({ title: t("successMessage") });
  isLoading.value = false;
  await refreshLatestExcretion();
  emit("submit");
};

const {
  data: excretions,
  refresh: refreshLatestExcretion,
  status: excretionStatus,
} = useFetch<dog_excretions[]>(
  () => `/api/${selectedDogId}/excretions/latest`,
  {
    watch: [() => selectedDogId],
    immediate: true,
  }
);
</script>
