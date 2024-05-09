import { Form } from 'react-router-dom';

function ChatPage() {
  return (
    <>
      <div>
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
      </div>

      <div role="list"></div>
    </>
  );
}

export default ChatPage;
