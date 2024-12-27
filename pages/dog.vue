<template>
  <UCard>
    <template #header>
      {{ dog?.data.name }}
    </template>

    {{ dog?.data.dog_excretions }}

    <template #footer>
      <UButton @click="insertRecord('pee')"> Add pee </UButton>
      <UToggle
        size="2xl"
        v-model="isOutdoors"
        on-icon="i-heroicons-sun"
        off-icon="i-heroicons-home"
      ></UToggle>
      <UButton @click="insertRecord('poop')"> Add poop </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const isOutdoors = ref(true);

const {
  data: dog,
  error,
  refresh,
} = await useAsyncData("dog", async () => {
  const { data, error } = await client
    .from("dog")
    .select("*, dog_excretions(*)")
    .single();

  return { data, error };
});

const insertRecord = async (type: "poop" | "pee") => {
  const res = await client.from("dog_excretions").insert({
    dog_id: dog.value?.data.id,
    handler_id: user.value?.id,
    location: isOutdoors.value ? "outdoors" : "indoors",
    type,
  });
  refresh();
};
</script>
