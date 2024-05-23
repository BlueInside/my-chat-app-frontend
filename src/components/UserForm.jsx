import { useFetcher } from 'react-router-dom';

export default function UserForm() {
  const fetcher = useFetcher();
  return (
    <div>
      <fetcher.Form></fetcher.Form>
    </div>
  );
}
