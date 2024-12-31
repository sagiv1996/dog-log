<template>
  <UForm
    :schema="dogValidationSchema"
    :state="state"
    class="space-y-4"
    @submit.prevent="onSubmit"
    validateOn="submit"
  >
    <UFormGroup name="name">
      <UInput
        icon="material-symbols:sound-detection-dog-barking-outline"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search..."
        v-model="state.name"
        autofocus
      />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { dogValidationSchema } from "#shared/utils/dogValidationSchema";
const emit = defineEmits(["submit"]);


const state = reactive({
  name: null,
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { name } = event.data;
  await useFetch("/api/dog", {
    method: "POST",
    body: { name },
  });
  emit("submit");
};
</script>
