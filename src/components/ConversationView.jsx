import { useLoaderData } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function ConversationView() {
  const conversation = useLoaderData();
  const { user } = useAuth();

  const messages = conversation?.messages;
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
    </div>
  );
}
