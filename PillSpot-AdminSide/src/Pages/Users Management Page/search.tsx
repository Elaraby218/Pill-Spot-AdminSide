import { useState } from 'react';

interface User {
  id: string;
  userName: string;
  email: string;
  // Add more fields as needed
}

interface SearchProps {
  onUserSelect: (user: User) => void;
}

const Search = ({ onUserSelect }: SearchProps) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/users/${username}`);
      if (!res.ok) throw new Error('User not found');
      const user: User = await res.json();
      onUserSelect(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error searching user');
      } else {
        setError('Error searching user');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center mb-4">
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="input input-bordered"
        required
      />
      <button type="submit" className="btn btn-primary light:bg-red-400" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <span className="text-red-500 ml-2">{error}</span>}
    </form>
  );
};

export default Search;
