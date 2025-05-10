import React from 'react';

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

const UserResultList: React.FC<UserResultListProps> = ({ results, loading, error, onSelect }) => (
  <div className="flex-1 overflow-y-auto pr-1">
    {loading && <div className="text-white">Loading...</div>}
    {error && <div className="text-red-400">{error}</div>}
    {results.map(user => (
      <div
        key={user.id}
        className={`flex items-center gap-3 bg-[#232B36] rounded-xl p-2 mb-2 cursor-pointer hover:bg-[#2C3745] transition`}
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
          <div className="font-semibold text-white leading-tight">{user.userName}</div>
          <div className="text-xs text-gray-400">{user.email}</div>
        </div>
        <div className="text-gray-400 text-xl">
          <span role="img" aria-label="link">🔗</span>
        </div>
      </div>
    ))}
  </div>
);

export default UserResultList; 