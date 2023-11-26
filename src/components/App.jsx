import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

const App = () => {
  const storage = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(storage || []);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitAddContact = ({ name, number }) => {
    const sameName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (sameName) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prev => [...prev, { id: nanoid(), name, number }]);
  };

  const onChange = e => {
    const { value } = e.currentTarget;

    setFilter(value);
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const filtred = filter.toLowerCase();
  const contactList = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filtred)
  );

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <ContactForm onSubmitAddContact={formSubmitAddContact} />
      <h2>Contacts</h2>
      <Filter onChange={onChange} data={filter} />
      <ContactList data={contactList} deleteContacts={deleteContact} />
    </div>
  );
};

export default App;
