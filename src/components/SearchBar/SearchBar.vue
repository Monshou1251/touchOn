<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search..."
      class="search-bar__input"
      @input="onInput"
    />
    <i class="mdi mdi-magnify search-bar__icon"></i>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['update:searchQuery']);

function onInput(event: Event) {
  emit('update:searchQuery', (event.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
@import "SearchBar.scss";
</style>
