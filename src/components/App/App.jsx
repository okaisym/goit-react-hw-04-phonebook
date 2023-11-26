import React, { useState, useEffect } from 'react';
import ContactForm from '../CreateForm';
import ContactList from '../ContactItem';
import Filter from '../Filter';
import { Title, Container } from './App.styled';

const storageKey = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const getFilteredContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    const savedContacts = window.localStorage.getItem(storageKey);
    if (savedContacts !== null) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []); 

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm addContact={addContact} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={handleInputChange} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </Container>
  );
};


