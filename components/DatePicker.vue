<template>
  <UPopover>
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      {{ df.format(date.toDate()) }}
    </UButton>
    <template #content>
      <UCalendar
        :yearControls="false"
        v-model="date"
        class="p-2"
        :maxValue="now(getLocalTimeZone())"
      />
    </template>
  </UPopover>
</template>
<script setup lang="ts">
import {
  DateFormatter,
  getLocalTimeZone,
  now,
  fromDate,
} from "@internationalized/date";

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
});
const emit = defineEmits(["update:model-value"]);

const date = computed({
  get: () => fromDate(props.modelValue, getLocalTimeZone()),
  set: (value) => emit("update:model-value", value.toDate()),
});
const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});
</script>
