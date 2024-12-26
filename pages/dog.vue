<template>
  <div>{{ data }}</div>
</template>
<script setup lang="ts">
const client = useSupabaseClient();
const { data } = await useAsyncData("dog", async () => {
  const { data } = await client.from("dog").select("id, name");

  return data;
});
</script>
