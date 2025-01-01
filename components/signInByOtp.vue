<template>
  <UPopover overlay v-model:open="isOpen">
    <UButton
      color="black"
      label="Login with OTP"
      icon="i-simple-icons-maildotru"
      block
      :loading="isLoading"
    />

    <template #panel>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header><UDivider label="OTP login" /> </template>

        <UForm
          :schema="schema"
          :state="state"
          ref="form"
          class="space-y-4"
          @submit="handleOnSubmit"
        >
          <UFormGroup name="email">
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
        <template #footer>We will send you a confirmation email</template>
      </UCard>
    </template>
  </UPopover>
</template>
<script setup lang="ts">
import { z } from "zod";
import type { Form, FormSubmitEvent } from "#ui/types";

const client = useSupabaseClient();
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
const handleOnSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;
  const { email } = event.data;
  const { error } = await client.auth.signInWithOtp({ email });
  isLoading.value = false;
  if (error) {
    form.value?.setErrors([
      {
        path: "email",
        message: error.message,
      },
    ]);
    return;
  }
  toast.add({
    title: `An email with a login link was sent to the address${email}`,
  });
  isOpen.value = false;
};
</script>
