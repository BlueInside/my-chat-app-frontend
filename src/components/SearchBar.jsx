import { Form, useLoaderData } from 'react-router-dom';
import UsersDisplay from './UsersDisplay';
export default function SearchBar() {
  const { users, q } = useLoaderData();

  return (
    <>
      <Form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search conversation"
          placeholder="Search..."
          type="search"
          name="q"
          defaultValue={q}
        />
        <div id="search-spinner" aria-hidden hidden={true}></div>
      </Form>
      <UsersDisplay users={users} />
    </>
  );
}
