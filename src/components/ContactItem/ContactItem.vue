<template>
  <div class="contact-item">
    <i class="mdi mdi-arrow-left contact-item__arrow" @click="$emit('back')"></i>
    <i class="mdi mdi-account-circle contact-item__account"></i>

    <div class="contact-item__info">
      <h4 class="contact-item__title">Name</h4>
      <div v-if="!editingName" @dblclick="startEditing('name')">{{ editedContact.name }}</div>
      <input v-else v-model="editedContact.name" @blur="finishEditing('name')" />
    </div>

    <div class="contact-item__info">
      <h4 class="contact-item__title">Surname</h4>
      <div v-if="!editingSurname" @dblclick="startEditing('surname')">{{ editedContact.surname }}</div>
      <input v-else v-model="editedContact.surname" @blur="finishEditing('surname')" />
    </div>

    <div class="contact-item__info">
      <h4 class="contact-item__title">Email</h4>
      <div v-if="!editingEmail" @dblclick="startEditing('email')">{{ editedContact.email }}</div>
      <input v-else v-model="editedContact.email" @blur="finishEditing('email')" />
    </div>

    <div class="contact-item__buttons">
      <i class="mdi mdi-check-circle contact-item__buttons-save" @click="saveContact" title="Save"></i>
      <i class="mdi mdi-minus-circle contact-item__buttons-delete" @click="deleteContact" title="Delete"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import type { Contact } from '@/types/Contact';

const props = defineProps<{
  contact: Contact;
}>();

const emit = defineEmits(['back', 'delete', 'save']);

const editedContact = ref({ ...props.contact });

const editingName = ref(false);
const editingSurname = ref(false);
const editingEmail = ref(false);

function startEditing(field: string) {
  if (field === 'name') editingName.value = true;
  if (field === 'surname') editingSurname.value = true;
  if (field === 'email') editingEmail.value = true;
}

function finishEditing(field: string) {
  if (field === 'name') editingName.value = false;
  if (field === 'surname') editingSurname.value = false;
  if (field === 'email') editingEmail.value = false;
}

function saveContact() {
  emit('save', { ...editedContact.value });
}

function deleteContact() {
  emit('delete', props.contact);
}
</script>

<style lang="scss" scoped>
@import "ContactItem.scss";
</style>
