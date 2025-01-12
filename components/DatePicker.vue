<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";
// @ts-ignore
import "v-calendar/dist/style.css";
import { format } from "date-fns";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
});

const emit = defineEmits(["update:model-value", "close"]);

const date = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
});

const attrs = {
  transparent: true,
  borderless: true,
  color: "primary",
  "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 2,
  mode: "dateTime",
  is24hr: true,
};

function onDayClick(_: any, event: MouseEvent): void {
  const target = event.target as HTMLElement;
  console.log({ target });
  target.blur();
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton
      icon="i-heroicons-calendar-days-20-solid"
      :label="date ? format(new Date(date), 'd MMM, yyyy') : 'Select Date'"
    />

    <template #panel="{ close }">
      <VCalendarDatePicker
        v-model="date"
        v-bind="{ ...attrs, ...$attrs }"
        :max-date="new Date()"
        @dayclick="onDayClick"
      />
    </template>
  </UPopover>
</template>
