import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../App/Store';

interface UserSearchFormProps {
  userName: string;
  setUserName: (v: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ userName, setUserName, onSearch, loading }) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  return (
    <form onSubmit={onSearch} className="space-y-3 mb-4">
      <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        User Search :
      </div>
      <div>
        <label className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
          User Name
        </label>
        <input
          type="text"
          className={`input input-bordered w-full ${
            theme === 'dark' 
              ? 'bg-[#232B36] text-white border-[#2C3745]' 
              : 'bg-white text-gray-900 border-gray-300'
          }`}
          value={userName}
          onChange={e => setUserName(e.target.value)}
          placeholder="Type here"
        />
      </div>
      <button 
        type="submit" 
        className={`btn w-full ${
          theme === 'dark'
            ? 'bg-[#232B36] text-white border border-[#2C3745] hover:bg-[#2C3745]'
            : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
        }`}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default UserSearchForm; 