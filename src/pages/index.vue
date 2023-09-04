<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
<div>
    pages index
    <button type="button" @click="count++">count is {{ count }}</button>
</div>
</template>

