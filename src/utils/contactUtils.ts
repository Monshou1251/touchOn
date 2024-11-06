// src/utils/contactUtils.ts
import { ref } from 'vue';

export interface Contact {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export const contactList = ref<Contact[]>([]); 
export const showAddContactModal = ref<boolean>(false);

export function addContact(newContact: Contact) {
  contactList.value.push(newContact);
  showAddContactModal.value = false;
}
