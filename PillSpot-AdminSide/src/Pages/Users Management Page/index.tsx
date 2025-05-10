import { useState } from 'react';
import UserSearchForm from './UserSearchForm';
import UserResultList from './UserResultList';
import UserDetailsPanel from './UserDetailsPanel';

interface User {
  id: string;
  userName: string;
  email: string;
  avatarUrl?: string;
  roles?: string[];
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  birthdate?: string;
}

const UsersManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    try {
      // will be replaced with api call
      setTimeout(() => {
        setResults([
          {
            id: '1',
            userName: 'johndoe',
            email: 'john@example.com',
            avatarUrl: '',
          },
          {
            id: '2',
            userName: 'janedoe',
            email: 'jane@example.com',
            avatarUrl: '',
          },
        ]);
        setLoading(false);
      }, 800);
    } catch {
      setError('Error searching users');
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[86vh] w-full gap-4  p-4 rounded-2xl items-center justify-center">
      <div className="flex-1 flex flex-col bg-[#1A2028] rounded-2xl p-4 h-full">
        <UserSearchForm userName={userName} setUserName={setUserName} onSearch={handleSearch} loading={loading} />
        <div className="text-lg font-bold text-white mb-2">Result :</div>
        <UserResultList results={results} loading={loading} error={error} onSelect={setSelectedUser} />
      </div>
      <div className="flex-3 bg-[#1A2028] rounded-2xl p-6 flex flex-col">
        {selectedUser && (
          <UserDetailsPanel
            user={selectedUser}
            onUserUpdated={setSelectedUser}
            onUserDeleted={() => setSelectedUser(null)}
          />
        )}
      </div>
    </div>
  );
};

export default UsersManagementPage;
