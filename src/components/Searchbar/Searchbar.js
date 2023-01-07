import { useState } from 'react';
import PropTypes from 'prop-types';
import { GrSearch } from 'react-icons/gr';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.Styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const inputType = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() !== '') {
      onSubmit(query);
    }
    setQuery('');
    e.target.reset();
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <GrSearch />
          <SearchFormLabel></SearchFormLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={inputType}
          type="text"
          name="query"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
