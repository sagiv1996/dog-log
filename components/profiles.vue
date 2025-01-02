<template>
  <UButtonGroup size="md" orientation="horizontal">
    <UAvatarGroup size="lg">
      <UAvatar
        v-for="(profile, index) in profiles"
        :key="index"
        :src="profile.avatar_url"
        :alt="profile.name"
        chip-color="primary"
        :chip-text="profile.name.slice(0, 3)"
        chip-position="top-left"
      />
    </UAvatarGroup>

    <UButton
      label="Button"
      color="primary"
      variant="outline"
      @click="isOpen = true"
    >
      <template #trailing>
        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
      </template>
    </UButton>
  </UButtonGroup>
  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header><UDivider label="Add user by email" /> </template>

      <UForm
        :schema="schema"
        :state="state"
        ref="form"
        class="space-y-4"
        @submit="handleOnSubmit"
      >
        <UFormGroup name="email" class="text-center">
          <UButtonGroup size="sm" orientation="horizontal">
            <UInput
              v-model="state.email"
              size="xl"
              icon="i-heroicons-envelope"
              placeholder="Email"
              block
            />
            <UButton
              type="submit"
              :loading="isLoading"
              icon="i-heroicons-arrow-right"
              color="gray"
            />
          </UButtonGroup>
        </UFormGroup>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { Form, FormSubmitEvent } from "#ui/types";
import type { Tables } from "~/types/database.types";
const emit = defineEmits(["submit"]);

type ProfileViewRow = Tables["profile"];
const toast = useToast();
const schema = z.object({
  email: z.string().email(),
});
type Schema = z.output<typeof schema>;
const form = ref<Form<Schema>>();
const isLoading = ref<boolean>(false);
const state = reactive({
  email: undefined,
});
const isOpen = ref(false);
const { profiles, selectedDog } = defineProps<{
  profiles: ProfileViewRow;
  selectedDog: number;
}>();

const handleOnSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;
  const { email } = event.data;
  const { data, error } = await useFetch("/api/dog-access", {
    method: "POST",
    body: {
      email,
      dog_id: selectedDog,
    },
  });
  isLoading.value = false;
  if (!data) {
    form.value?.setErrors([
      {
        path: "email",
        message: "Error. try later.",
      },
    ]);
    return;
  }
  toast.add({
    title: `An email with a login link was sent to the address${email}`,
  });
  isOpen.value = false;
  emit("submit");
};
</script>
