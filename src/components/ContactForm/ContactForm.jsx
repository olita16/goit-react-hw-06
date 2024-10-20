import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useSelector, useDispatch } from 'react-redux';
import { getVisibleContacts } from '../../redux/selectors';
import { addContact } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

const nameInputId = nanoid();
const numberInputId = nanoid();

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const isInContacts = contacts.some(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (isInContacts) {
      return Notify.info(`${name} is already in contacts`);
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  return (
    <div>
      <form className={css.contactForm} onSubmit={handleSubmit}>
        <label className={css.formLabel} htmlFor={nameInputId}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css.formLabel} htmlFor={numberInputId}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Phone number must be at least 10 digits long or follow the format +380931112233 or +38 093 333 4455."
            required
          />
        </label>

        <button className={css.addButton} type="submit">
          Add contact{' '}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;