<template>
  <UForm
    :schema="dogValidationSchema"
    :state="state"
    class="space-y-4"
    @submit.prevent="onSubmit"
    validateOn="change"
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
type Schema = z.output<typeof dogValidationSchema>;
const emit = defineEmits(["submit"]);

const state = reactive({
  name: undefined,
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
