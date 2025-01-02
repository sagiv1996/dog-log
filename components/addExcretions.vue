<template>
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
</template>
<script setup lang="ts">
const emit = defineEmits(["submit"]);
const { selectedDog } = defineProps<{
  selectedDog: number;
}>();
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
    },
  });
  if (error.value || data.value?.["error"]) {
    toast.add({ title: `Error to add record`, color: "red" });
  }
  toast.add({ title: "Record Added" });
  isLoading.value = false;
  emit("submit");
};
</script>
