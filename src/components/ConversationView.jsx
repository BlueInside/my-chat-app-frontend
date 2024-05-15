import { useFetcher, useLoaderData } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useEffect, useState } from 'react';

export default function ConversationView() {
  const fetcher = useFetcher();
  const conversation = useLoaderData();
  const { user } = useAuth();
  const [messages, setMessages] = useState(conversation.messages || []);
  const receiverId = conversation.participants.filter(
    (p) => p._id !== user._id
  );

  useEffect(() => {
    if (fetcher.data && fetcher.data.data && fetcher.data.data.id) {
      setMessages((prev) => [...prev, fetcher.data.data]);
    }
  }, [fetcher.data]);

  return (
    <div>
      <title id="receiver-username"></title>
      <div id="messages-window">
        <ul>
          {messages ? (
            messages.map((m) => (
              <div key={m.id}>
                <li>{m.text}</li>
              </div>
            ))
          ) : (
            <li>So empty, don`&apos;t be shy and send a message.</li>
          )}
        </ul>
      </div>
      <div>
        <fetcher.Form method="post" action="/messages">
          <input type="hidden" name="receiverId" value={receiverId} />
          <label htmlFor="message" className="visually-hidden">
            Type your message here:
          </label>
          <input
            type="text"
            name="text"
            id="message"
            aria-label="Type your message"
            placeholder="Type a message"
            required
          />
          <button type="submit">Send</button>
        </fetcher.Form>
      </div>
    </div>
  );
}
