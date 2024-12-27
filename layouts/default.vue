<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold">Dog log</div>
          <nav class="flex space-x-4">image?</nav>
          <UAvatar :src="user.user_metadata.avatar_url" alt="Avatar" />
        </div>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-6">
      <slot />
    </main>

    <footer class="bg-gray-900 text-white">
      <div class="container mx-auto px-4 py-4 text-center">
        © 2024 Dog log. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
</script>
