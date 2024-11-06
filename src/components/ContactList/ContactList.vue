<template>
  <div class="contact-list">
    <transition name="fade" mode="out-in">
      <div v-if="!selectedContact" class="contact-list__container">
        <div class="contact-list__title">
          <i class="mdi mdi-account contact-list__title-icon"></i>
          <div class="contact-list__title-text">CONTACTS</div>
        </div>
        <div class="contact-list__search">
          <SearchBar v-model:searchQuery="searchQuery" />
        </div>

        <div class="contact-list__book">
          <template v-if="Object.keys(filteredContacts).length > 0">
            <template v-for="(contacts, letter) in filteredContacts" :key="letter">
              <div class="contact-list__section">
                <h3 class="contact-list__letter">{{ letter }}</h3>
                <div v-for="contact in contacts" :key="contact.email" class="contact-list__entry"
                  @click="selectContact(contact)">
                  <div>
                    {{ contact.name }} {{ contact.surname }}
                  </div>
                </div>
              </div>
            </template>
          </template>

          <div v-else class="contact-list__no-results">
            <i class="mdi mdi-magnify contact-list__no-results-icon"></i>
            No results for "{{ searchQuery }}"
          </div>
        </div>

        <div class="contact-list__add-container">
          <i class="mdi mdi-plus-circle contact-list__add-container-icon" @click="showAddContactModal = true"></i>
        </div>
        <div v-if="showAddContactModal">
          <ContactForm @addContact="addContact" @closeModal="showAddContactModal = false" />
        </div>
      </div>

      <ContactItem v-else :contact="selectedContact" @back="clearSelectedContact" @delete="deleteContact"
        @save="saveContact" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import ContactForm from '@/components/ContactForm/ContactForm.vue';
import ContactItem from '@/components/ContactItem/ContactItem.vue';
import { ref, computed, watch, onBeforeMount } from 'vue';

interface Contact {
  id: number;
  name: string;
  surname: string;
  email: string;
}

const contactList = ref<Contact[]>([]);
const searchQuery = ref<string>('');
const showAddContactModal = ref<boolean>(false);
const selectedContact = ref<Contact | null>(null);

const defaultContacts: Contact[] = [
  { id: 1, name: 'Albert', surname: 'Kek', email: 'albert@example.com' },
  { id: 2, name: 'Billby', surname: 'Bob', email: 'billby@example.com' },
  { id: 3, name: 'Bolder', surname: 'Ist', email: 'bolder@example.com' },
  { id: 4, name: 'Diana', surname: 'Prince', email: 'diana.prince@example.com' },
  { id: 5, name: 'Alice', surname: 'Jones', email: 'alice@example.com' },
  { id: 6, name: 'Charlie', surname: 'Smith', email: 'charlie@example.com' },
  { id: 7, name: 'Eve', surname: 'Taylor', email: 'eve.taylor@example.com' },
  { id: 8, name: 'Frank', surname: 'Murphy', email: 'frank.murphy@example.com' },
  { id: 9, name: 'Grace', surname: 'Hopper', email: 'grace.hopper@example.com' },
  { id: 10, name: 'Hank', surname: 'Green', email: 'hank.green@example.com' },
  { id: 11, name: 'Ivy', surname: 'Adams', email: 'ivy.adams@example.com' },
  { id: 12, name: 'John', surname: 'Doe', email: 'john.doe@example.com' },
  { id: 13, name: 'Karen', surname: 'White', email: 'karen.white@example.com' },
  { id: 14, name: 'Liam', surname: 'Brown', email: 'liam.brown@example.com' },
  { id: 15, name: 'Mona', surname: 'Smith', email: 'mona.smith@example.com' },
  { id: 16, name: 'Nina', surname: 'Simone', email: 'nina.simone@example.com' },
  { id: 17, name: 'Oscar', surname: 'Johnson', email: 'oscar.johnson@example.com' },
  { id: 18, name: 'Paul', surname: 'Walker', email: 'paul.walker@example.com' },
  { id: 19, name: 'Quinn', surname: 'Gordon', email: 'quinn.gordon@example.com' },
  { id: 20, name: 'Rita', surname: 'Lee', email: 'rita.lee@example.com' },
];


onBeforeMount(() => {
  const savedContacts = localStorage.getItem('contactList');
  contactList.value = savedContacts ? JSON.parse(savedContacts) : defaultContacts;
});

watch(contactList, (newList) => {
  localStorage.setItem('contactList', JSON.stringify(newList));
}, { deep: true });



const filteredContacts = computed(() => {
  const filtered = contactList.value.filter(contact =>
    `${contact.name} ${contact.surname}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );

  const groups: Record<string, Contact[]> = {};
  filtered
    .toSorted((a, b) => a.name.localeCompare(b.name))
    .forEach((contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
    });
  return groups;
});

function addContact(newContact: Contact) {
  contactList.value.push(newContact);
  showAddContactModal.value = false;
}

function selectContact(contact: Contact) {
  selectedContact.value = contact;
}

function clearSelectedContact() {
  selectedContact.value = null;
}

function deleteContact(contact: Contact) {
  contactList.value = contactList.value.filter(c => c.id !== contact.id);
  clearSelectedContact();
}

function saveContact(updatedContact: Contact) {
  const index = contactList.value.findIndex(c => c.id === updatedContact.id);
  if (index !== -1) {
    contactList.value[index] = updatedContact;
  }
}

</script>

<style lang="scss" scoped>
@import "ContactList.scss";
</style>
