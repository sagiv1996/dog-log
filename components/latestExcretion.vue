<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-medium">{{ $t("latestExcretion") }}</h3>
    </template>
    <template v-for="excretion in latestExcretion" :key="excretion.id">
      <UCard
        :title="excretion.type"
        :icon="
          excretion.type === 'pee' ? 'i-heroicons-beaker' : 'i-heroicons-fire'
        "
        color="neutral"
      >
        <template #header>
          <h3 class="text-lg font-medium">
            <UIcon
              :name="
                excretion.type === 'pee'
                  ? 'i-heroicons-beaker'
                  : 'i-heroicons-fire'
              "
              class="size-5"
            />
            Add {{ excretion.type }} by {{ excretion.handler_id }} ({{
              excretion.location
            }}) - for {{ excretion.date }} {{ excretion.created_at }}
          </h3>
        </template>
      </UCard>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const { selectedDog } = defineProps<{
  selectedDog: number;
}>();
const { data: latestExcretion } = await useFetch(
  `/api/${selectedDog}/excretions/latest`,
  {
    watch: [() => selectedDog],
  }
);
</script>
