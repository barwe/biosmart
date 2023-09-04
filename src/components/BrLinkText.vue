<script setup lang="ts">
defineProps<{ text?: string; to: string }>()
</script>

<template>
  <a :href="to" class="text-gray-500">
    <slot>
      {{ text }}
    </slot>
  </a>
</template>
