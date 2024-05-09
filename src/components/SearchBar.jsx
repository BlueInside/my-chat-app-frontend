import { Form } from 'react-router-dom';

export default function SearchBar() {
  return (
    <Form id="search-form" role="search">
      <input
        id="q"
        aria-label="Search conversation"
        placeholder="Search"
        type="search"
        name="q"
      />
      <div id="search-spinner" aria-hidden hidden={true}></div>
    </Form>
  );
}
