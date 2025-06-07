import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../App/Store';

interface User {
  id: string;
  userName: string;
  email: string;
  avatarUrl?: string;
}

interface UserResultListProps {
  results: User[];
  loading: boolean;
  error: string;
  onSelect: (user: User) => void;
}

const UserResultList: React.FC<UserResultListProps> = ({ results, loading, error, onSelect }) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

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
      {results.map(user => (
        <div
          key={user.id}
          className={`flex items-center gap-3 rounded-xl p-2 mb-2 cursor-pointer transition ${
            theme === 'dark'
              ? 'bg-[#232B36] hover:bg-[#2C3745]'
              : 'bg-white hover:bg-gray-50 border border-gray-200'
          }`}
          onClick={() => onSelect(user)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 flex items-center justify-center text-2xl font-bold text-white">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.userName} className="w-full h-full rounded-full object-cover" />
            ) : (
              user.userName[0].toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <div className={`font-semibold leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {user.userName}
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
      ))}
    </div>
  );
};

export default UserResultList; 