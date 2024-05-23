import { useFetcher } from 'react-router-dom';

export default function UserForm() {
  const fetcher = useFetcher();
  return (
    <div>
      <fetcher.Form>
        <div>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            aria-label="Full name"
          />
        </div>
        <div>
          <label htmlFor="avatar">Avatar</label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            aria-label="Avatar"
            placeholder="Choose a profile picture"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            aria-label="Date of Birth"
            placeholder="Enter your date of birth"
          />
        </div>
        <button type="submit">Submit</button>
      </fetcher.Form>
    </div>
  );
}
