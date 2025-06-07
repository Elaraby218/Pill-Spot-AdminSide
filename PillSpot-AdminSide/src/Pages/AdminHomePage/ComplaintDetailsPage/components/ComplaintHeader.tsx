import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../App/Store';
import { FaUserCircle, FaSearch } from 'react-icons/fa';

interface ComplaintHeaderProps {
  onGoToUserProfile: () => void;
  onChatSearch: (query: string) => void;
  onGoToComplaintsTable: () => void;
}

const ComplaintHeader: React.FC<ComplaintHeaderProps> = ({ 
  onGoToUserProfile, 
  onChatSearch,
  onGoToComplaintsTable 
}) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChatSearch(searchQuery);
  };

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl shadow-lg mb-6 ${
      theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
    }`}>
      <button
        onClick={onGoToUserProfile}
        className={`btn px-4 py-2 rounded-md font-semibold flex items-center gap-2 ${
          theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        } transition`}
      >
        <FaUserCircle /> Go to User Profile
      </button>
      <button
        onClick={onGoToComplaintsTable}
        className={`btn px-4 py-2 rounded-md font-semibold flex items-center gap-2 ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
        } transition`}
      >
        Go to Complaints Table
      </button>
      <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 md:justify-end">
        <input
          type="text"
          placeholder="chat search"
          className={`input input-bordered flex-1 max-w-sm ${
            theme === 'dark' ? 'bg-[#1A2028] text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className={`btn px-4 py-2 rounded-md font-semibold ${
            theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
          } transition`}
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default ComplaintHeader; 