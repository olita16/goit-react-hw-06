import React from 'react';
import { useSelector } from 'react-redux';
import { getVisibleContacts } from '../../redux/selectors';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(getVisibleContacts);

  return (
    <div>
      <ul className={css.contactList}>
        {contacts.map(contact => (
          <Contact key={contact.id} id={contact.id} name={contact.name} number={contact.number} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

