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

interface Contact {
  id: string;
  name: string;
  surname: string;
  email: string;
}

const emit = defineEmits<{
  (event: 'addContact', contact: Contact): void;
  (event: 'closeModal'): void;
}>();

const showModal = ref(true);
const contact = ref<Contact>({ id: '', name: '', surname: '', email: '' });

function submitContact() {
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
