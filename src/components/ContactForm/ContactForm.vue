<template>
  <div class="contact-item">
    <div class="contact-item__container">
      <h3>Add New Contact</h3>
      <form @submit.prevent="submitContact">
        <input v-model="contact.name" placeholder="First Name" required />
        <input v-model="contact.surname" placeholder="Surname" required />
        <input v-model="contact.email" placeholder="Email" required type="email" />
        <div class="contact-item__buttons">
          <button type="submit" class="contact-item__item">Add Contact</button>
          <button type="button" @click="closeModal" class="contact-item__item contact-item__cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, onMounted, onBeforeUnmount } from 'vue';
import type { Contact } from '@/types/Contact';

const emit = defineEmits<{
  (event: 'addContact', contact: Contact): void;
  (event: 'closeModal'): void;
}>();

const showModal = ref(true);

// Define contact without an `id` initially
const contact = ref<Omit<Contact, 'id'>>({ name: '', surname: '', email: '' });

function submitContact() {
  // Assign an `id` when emitting the addContact event
  emit('addContact', { id: Date.now(), ...contact.value });
  closeModal();
}

function closeModal() {
  showModal.value = false;
  emit('closeModal');
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape);
});
</script>

<style lang="scss" scoped>
@import "ContactForm.scss";
</style>
