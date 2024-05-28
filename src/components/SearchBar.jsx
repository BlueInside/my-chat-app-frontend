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
import PropTypes from 'prop-types';

const StyledForm = styled(Form)`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 30px;
  gap: 10px;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px; 
  margin: 8px 0; 
  box-sizing: border-box; 
  border: 2px solid #ccc; 
  border-radius: 8px; 

  font-size: 16px; 
  color: #333; 

  &:focus {
    border-color: #007bff; 
    outline: none; 
  }
`;

export default function SearchBar({ conversations, setConversations }) {
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
            }, 150); // Delay by 50ms so it's possible to click on user and fire click handler
          }}
        />
        {searching && <ThreeDotsLoader />}
      </StyledForm>
      {isFocused && (
        <UsersDisplay
          setConversations={setConversations}
          conversations={conversations}
          users={users}
        />
      )}
    </SearchContainer>
  );
}

SearchBar.propTypes = {
  conversations: PropTypes.array,
  setConversations: PropTypes.func,
};
