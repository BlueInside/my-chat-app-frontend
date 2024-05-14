import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import UsersDisplay from './UsersDisplay';
import { useState } from 'react';
import ThreeDotsLoader from '../styles/ThreeDotsLoader.styles';

import styled from 'styled-components';

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
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  return (
    <SearchContainer>
      <StyledForm id="search-form" role="search">
        <SearchInput
          id="q"
          aria-label="Search conversation"
          placeholder="Search..."
          type="search"
          name="q"
          defaultValue={q}
          className={searching ? 'loading' : ''}
          onChange={(e) => {
            const isFirstSearch = q == null;
            e.preventDefault();
            submit(e.currentTarget.form, {
              replace: !isFirstSearch,
            });
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
