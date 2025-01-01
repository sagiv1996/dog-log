<template>
  <UCard>
    <template #header>Redirect... </template>
  </UCard>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "confirm",
});
</script>
