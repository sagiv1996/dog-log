<template>
  <UAvatarGroup size="3xl">
    <UChip
      inset
      v-for="(profile, index) in profiles"
      :text="profile.name.slice(0, 3)"
      position="top-left"
    >
      <UAvatar :src="profile.avatar_url" :alt="profile.name" />
    </UChip>
    <UChip inset size="3xl" :show="false">
      <UModal :title="$t('addUser')">
        <UButton icon="i-mdi-plus" size="xl" :label="$t('addUser')" />

        <template #body>
          <UForm
            :schema="schema"
            :state="state"
            ref="form"
            class="space-y-4"
            @submit="handleOnSubmit"
          >
            <UFormField name="email" class="text-center">
              <UInput
                v-model="state.email"
                size="xl"
                icon="i-heroicons-envelope"
                placeholder="Email"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="xl"
                    icon="i-heroicons-arrow-right"
                    aria-label="submit input"
                    type="submit"
                  />
                </template>
              </UInput>
            </UFormField>
          </UForm>
        </template>
      </UModal>
    </UChip>
  </UAvatarGroup>
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
        name: "email",
        message: "Error. try later.",
      },
    ]);
    return;
  }
  toast.add({
    title: `An email with a login link was sent to the address${email}`,
  });
  emit("submit");
};
</script>
