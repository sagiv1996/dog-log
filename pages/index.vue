<template>
  <UCard>
    <template #header>{{ $t("redirect") }}</template>
  </UCard>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "confirm",
});
</script>
