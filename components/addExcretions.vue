<template>
  <div class="grid grid-cols-2 gap-6 justify-items-center">
    <USwitch
      unchecked-icon="i-heroicons-home"
      checked-icon="i-heroicons-sun"
      default-value
      v-model="isOutDoors"
      :loading="isLoading"
      :disabled="!selectedDog"
      size="xl"
      aria-label="indoors or outdoors"
    />
    <date-picker v-model="date" />
    <UButton
      label="pee"
      block
      size="md"
      @click="handleClickTypeButton('pee')"
      :loading="isLoading"
      :disabled="!selectedDog"
      aria-label="is pee"
    />

    <UButton
      label="poop"
      block
      size="md"
      @click="handleClickTypeButton('poop')"
      :loading="isLoading"
      :disabled="!selectedDog"
      aria-label="is poop"
    />
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["submit"]);
const { selectedDog } = defineProps<{
  selectedDog: number;
}>();
const date = ref<Date>(new Date());
const toast = useToast();
const isOutDoors = ref<boolean>(true);
const isLoading = ref(false);
const handleClickTypeButton = async (selectedType: "poop" | "pee") => {
  isLoading.value = true;
  const { data, error } = await useFetch("/api/dog-excretions", {
    method: "POST",
    body: {
      dog_id: selectedDog,
      location: isOutDoors.value ? "outdoors" : "indoors",
      type: selectedType,
      date: date.value,
    },
  });
  if (error.value) {
    toast.add({ title: `Error to add record`, color: "red" });
  }
  toast.add({ title: "Record Added" });
  isLoading.value = false;
  emit("submit");
};
</script>
