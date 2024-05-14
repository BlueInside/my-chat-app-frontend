import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import UsersDisplay from './UsersDisplay';
export default function SearchBar() {
  const { users, q } = useLoaderData();
  const submit = useSubmit();
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
          onChange={(e) => {
            e.preventDefault();
            submit(e.currentTarget.form);
          }}
        />
        <div id="search-spinner" aria-hidden hidden={true}></div>
      </Form>
      <UsersDisplay users={users} />
    </>
  );
}
