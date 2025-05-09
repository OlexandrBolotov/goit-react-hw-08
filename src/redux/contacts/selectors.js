import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const norm = filter.toLowerCase();
    return contacts.filter(
      c =>
        c.name.toLowerCase().includes(norm) ||
        c.number?.toLowerCase().includes(norm)
    );
  }
);
