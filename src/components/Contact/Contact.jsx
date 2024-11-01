import React from 'react';
import { useDispatch } from 'react-redux';
import { removeContact } from '../../redux/contactsSlice';
import css from './Contact.module.css';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li className={css.contactListItem}>
      {`${name} : ${number}`}
      <button
        className={css.deleteButton}
        type="button"
        onClick={() => dispatch(removeContact({ id }))}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;

