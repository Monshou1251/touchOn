// tests/contactUtils.spec.ts
import { describe, it, expect } from 'vitest'
import { addContact, contactList, showAddContactModal } from '@/utils/contactUtils'
import type { Contact } from '@/utils/contactUtils' 

describe('addContact function', () => {
  it('should add a new contact and close the modal', () => {
    contactList.value = [];

    const newContact: Contact = {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
    };

    addContact(newContact);

    expect(contactList.value).toContainEqual(newContact);
    expect(showAddContactModal.value).toBe(false);
  });
});
