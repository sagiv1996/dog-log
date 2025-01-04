<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold">Dog log</div>
        </div>
      </div>
    </header>

    <main class="container mx-auto">
      <NuxtPwaManifest />
      <slot />
    </main>
  </div>
</template>
