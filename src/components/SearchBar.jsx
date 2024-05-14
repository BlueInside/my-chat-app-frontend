import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import UsersDisplay from './UsersDisplay';
import { useCallback, useEffect, useRef, useState } from 'react';
import ThreeDotsLoader from '../styles/ThreeDotsLoader.styles';

import styled from 'styled-components';
import debounce from '../utils/debounce';

const StyledForm = styled(Form)`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  max-width: 250px;
  display: flex;
  position: relative;
  gap: 10px;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px; // Generous padding for a larger touch area
  margin: 8px 0; // Adds some space around the input
  box-sizing: border-box; // Makes sure paddings and borders are included in the width

  border: 2px solid #ccc; // Subtle border
  border-radius: 8px; // Rounded corners

  font-size: 16px; // Larger text for better readability
  color: #333; // Dark color for text

  &:focus {
    border-color: #007bff; // Highlight color when the input is focused
    outline: none; // Removes the default focus outline
  }
`;

export default function SearchBar() {
  const { users, q } = useLoaderData();
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(q || '');
  const submit = useSubmit();

  const formRef = useRef(null);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  const debouncedSubmit = useCallback(
    debounce(() => {
      if (formRef.current) {
        submit(formRef.current, { replace: !!q });
      }
    }, 500),
    [submit, q]
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedSubmit();
    }
  }, [searchQuery, debouncedSubmit]);

  return (
    <SearchContainer>
      <StyledForm id="search-form" role="search" ref={formRef}>
        <SearchInput
          id="q"
          aria-label="Search conversation"
          placeholder="Search..."
          type="search"
          name="q"
          defaultValue={q}
          className={searching ? 'loading' : ''}
          onChange={(e) => {
            e.preventDefault();
            setSearchQuery(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
            }, 80); // Delay by 50ms so it's possible to click on user and fire click handler
          }}
        />
        {searching && <ThreeDotsLoader />}
      </StyledForm>
      {isFocused && <UsersDisplay users={users} />}
    </SearchContainer>
  );
}
