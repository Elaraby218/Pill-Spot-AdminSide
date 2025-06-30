import { useState } from 'react';
import UserSearchForm from './UserSearchForm';
import UserResultList from './UserResultList';
import UserDetailsPanel from './UserDetailsPanel';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../App/Store';
import { FaUser } from 'react-icons/fa';

import { fetchAllUsers } from '../../Featurs/User/usersSlice';
import { useDispatch } from 'react-redux';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
}

const UsersManagementPage = () => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const results = useSelector((state: RootState) => state.users.users);
  const [loading] = useState(false);
  const [error] = useState('');

  const dipatch = useDispatch<AppDispatch>();

  const handleSearch = async (e: React.FormEvent) => {

    e.preventDefault();
    try {
     
        await dipatch(fetchAllUsers(userName));
      
    } catch {
      console.log("hello")
    }

  };

  return (
    <div className="flex h-[86vh] w-full gap-4 p-4 rounded-2xl items-center justify-center">
      <div className={`flex-1 flex flex-col rounded-2xl p-4 h-full transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1A2028]' : 'bg-gray-100'
        }`}>
        <UserSearchForm userName={userName} setUserName={setUserName} onSearch={handleSearch} loading={loading} />
        <div className={`text-lg font-bold mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
          Result :
        </div>
        <UserResultList results={results} loading={loading} error={error} onSelect={setSelectedUser} />
      </div>
      <div className={`flex-3 rounded-2xl p-6 flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1A2028]' : 'bg-gray-100'
        }`}>
        {selectedUser ? (
          <UserDetailsPanel
            user={selectedUser}
            onUserUpdated={setSelectedUser}
            onUserDeleted={() => setSelectedUser(null)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(93vh-9rem)]">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
              }`}>
              <FaUser className={`w-16 h-16 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`} />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
              No User Selected
            </h2>
            <p className={`text-center max-w-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Select a user from the search results to view and manage their details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagementPage;
