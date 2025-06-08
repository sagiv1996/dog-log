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
        <UIcon
          :name="
            excretion.type === 'pee' ? 'i-heroicons-beaker' : 'i-heroicons-fire'
          "
          class="size-5"
        />
        Add {{ excretion.type }} by {{ excretion.handler_id }} ({{
          excretion.location
        }}) - for
        {{ $dayjs(excretion.date).utc().format("DD/MM/YYYY HH:mm") }}

        <UTooltip
          location="top"
          :text="$dayjs(excretion.created_at).utc().format('DD/MM/YYYY HH:mm')"
        >
          <time
            :datetime="$dayjs(excretion.created_at).utc().toString()"
            class="text-sm text-gray-500"
          >
            {{ $dayjs(excretion.created_at).utc().fromNow() }}
          </time>
        </UTooltip>
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
