import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByUsername, User } from '../../Featurs/User/usersSlice';
import { RootState, AppDispatch } from '../../App/Store';

interface SearchProps {
  onUserSelect: (user: User) => void;
}

const Search = ({ onUserSelect }: SearchProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.users);
  const [username, setUsername] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(fetchUserByUsername(username));
    if (fetchUserByUsername.fulfilled.match(resultAction)) {
      onUserSelect(resultAction.payload);
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
        {loading ? 'Searching...' : 'Seaxzcfrch'}
      </button>
      {error && <span className="text-red-500 ml-2">{error}</span>}
    </form>
  );
};

export default Search;
