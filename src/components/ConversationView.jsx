import { useLoaderData } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function ConversationView() {
  const conversation = useLoaderData();
  const { user } = useAuth();
  return <></>;
}
