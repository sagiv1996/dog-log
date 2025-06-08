<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-medium">{{ $t("latestExcretion") }}</h3>
    </template>
    <template v-for="excretion in excretions" :key="excretion.id">
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
        {{ $t("add") }} {{ $t(excretion.type) }} ({{ $t(excretion.location) }})
        - {{ $t("forDate") }}
        {{
          $dayjs(excretion.date)
            .utc()
            .locale($i18n.locale)
            .format("DD/MM/YYYY HH:mm")
        }}

        <UTooltip
          location="top"
          :text="
            $dayjs(excretion.created_at)
              .utc()
              .locale($i18n.locale)
              .format('DD/MM/YYYY HH:mm')
          "
        >
          <time
            :datetime="
              $dayjs(excretion.created_at).utc().locale($i18n.locale).toString()
            "
            class="text-sm text-gray-500"
            :locale="$i18n.locale"
          >
            {{
              $dayjs(excretion.created_at).utc().locale($i18n.locale).fromNow()
            }}
          </time>
        </UTooltip>
      </UCard>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { dog_excretions } from "~/types/database.types";

const { selectedDog, excretions } = defineProps<{
  excretions: dog_excretions[];
}>();
</script>
