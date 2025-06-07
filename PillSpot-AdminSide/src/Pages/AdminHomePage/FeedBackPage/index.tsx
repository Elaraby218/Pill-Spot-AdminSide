import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../App/Store';
import FeedbackTableRow from './FeedbackTableRow';

interface Complaint {
  id: string;
  userName: string;
  lastComplainDate: string;
  lastComplainSubject: string;
  numberOfComplains: number;
  status: string;
}

type SortKeys = keyof Complaint | 'default';

type SortOrder = 'asc' | 'desc';

const FeedbackPage = () => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const [complaints] = useState<Complaint[]>([
    { id: '1', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '2', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '3', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '4', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '5', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '6', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '7', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '8', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '9', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    { id: '10', userName: 'johndoe', lastComplainDate: new Date().toISOString().split('T')[0], lastComplainSubject: 'Login issue', numberOfComplains: 3, status: 'Pending' },
    
  ]);

  const [sortKey, setSortKey] = useState<SortKeys>('lastComplainDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const sortedComplaints = [...complaints].sort((a, b) => {
    if (sortKey === 'default') {
      // Default sort by oldest complain (lastComplainDate asc)
      return new Date(a.lastComplainDate).getTime() - new Date(b.lastComplainDate).getTime();
    }

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortKey === 'lastComplainDate') {
        const dateA = new Date(aValue).getTime();
        const dateB = new Date(bValue).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const filteredComplaints = sortedComplaints.filter(complaint => {
    const matchesSearchTerm = complaint.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              complaint.id.includes(searchTerm);

    const matchesDate = selectedDate === null || new Date(complaint.lastComplainDate).toISOString().split('T')[0] === selectedDate;
    const matchesStatus = selectedStatus === null || complaint.status === selectedStatus;

    return matchesSearchTerm && matchesDate && matchesStatus;
  });

  const handleSort = (key: SortKeys) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDate(null);
    setSelectedStatus(null);
  };

  return (
    <div className="flex flex-col items-center w-full gap-6 p-4">
      <div className={`flex flex-col md:flex-row gap-4 w-full p-4 rounded-xl shadow-lg ${
        theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
      }`}>
        <input
          type="text"
          placeholder="search by id , user name"
          className={`input input-bordered flex-1 ${
            theme === 'dark' ? 'bg-[#1A2028] text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className={`input input-bordered ${
            theme === 'dark' ? 'bg-[#1A2028] text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'
          }`}
          value={selectedDate || ''}
          onChange={(e) => setSelectedDate(e.target.value === '' ? null : e.target.value)}
        />
        <button
          onClick={handleResetFilters}
          className={`px-4 py-2 rounded-md font-semibold ${
            theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          } transition`}
        >
          Reset Filters
        </button>
        <div className={`flex flex-wrap justify-center gap-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          <button
            onClick={() => setSelectedStatus(null)}
            className={`px-4 py-2 rounded-md font-semibold ${
              selectedStatus === null
                ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            } transition`}
          >
            All
          </button>
          {[ 'Pending', 'Resolved', 'Open' ].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-md font-semibold ${
                selectedStatus === status
                  ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              } transition`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className={`w-full rounded-xl shadow-lg overflow-hidden ${
        theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
      }`}>
        <div className={`grid grid-cols-7 gap-4 p-4 font-bold text-sm ${
          theme === 'dark' ? 'bg-[#1A2028] text-white' : 'bg-gray-100 text-gray-700'
        } border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="cursor-pointer" onClick={() => handleSort('id')}>#Id {sortKey === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
          <div className="cursor-pointer" onClick={() => handleSort('userName')}>user name {sortKey === 'userName' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
          <div className="cursor-pointer" onClick={() => handleSort('lastComplainDate')}>last complain date {sortKey === 'lastComplainDate' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
          <div className="cursor-pointer" onClick={() => handleSort('lastComplainSubject')}>Last complain subject {sortKey === 'lastComplainSubject' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
          <div className="cursor-pointer" onClick={() => handleSort('numberOfComplains')}>number of complains {sortKey === 'numberOfComplains' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
          <div className="cursor-pointer" onClick={() => handleSort('status')}>Status {sortKey === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
          <div>view</div>
        </div>
        <div className="p-4">
          {filteredComplaints.length > 0 ? (
            <div className="overflow-y-auto max-h-[calc(93vh-18rem)]">
              {filteredComplaints.map(complaint => (
                <FeedbackTableRow key={complaint.id} complaint={complaint} />
              ))}
            </div>
          ) : (
            <div className={`text-center py-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>No complaints found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
