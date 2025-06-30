import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../App/Store';

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

interface UserResultListProps {
  results: User[] | User;
  loading: boolean;
  error: string;
  onSelect: (user: User) => void;
}

const UserResultList: React.FC<UserResultListProps> = ({ results, loading, error, onSelect }) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  const renderUser = (user: User) => (
    <div
      key={user.userName}
      className={`flex items-center gap-3 rounded-xl p-2 mb-2 cursor-pointer transition ${
        theme === 'dark'
          ? 'bg-[#232B36] hover:bg-[#2C3745]'
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      }`}
      onClick={() => onSelect(user)}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
        {user.profilePictureUrl ? (
          <img src={import.meta.env.VITE_API_BASE_URL+user.profilePictureUrl} alt={user.userName} className="w-full h-full rounded-full object-cover" />
        ) : (
          user.userName[0].toUpperCase()
        )}
      </div>
      <div className="flex-1">
        <div className={`font-semibold leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          {user.firstName} {user.lastName}
        </div>
        <div className={`text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {user.email}
        </div>
      </div>
      <div className={`text-xl ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <span role="img" aria-label="link">🔗</span>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto pr-1">
      {loading && (
        <div className={`${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Loading...
        </div>
      )}
      {error && <div className="text-red-400">{error}</div>}
      {Array.isArray(results)
        ? results.map(renderUser)
        : results && renderUser(results)}
    </div>
  );
};

export default UserResultList; 