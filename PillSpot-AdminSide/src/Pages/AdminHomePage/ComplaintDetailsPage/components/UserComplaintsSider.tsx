import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../App/Store';
import { useNavigate } from 'react-router-dom';

interface SiderComplaint {
  id: string;
  lastComplainSubject: string;
  lastComplainDate: string;
}

interface UserComplaintsSiderProps {
  complaints: SiderComplaint[];
  currentComplaintId: string;
}

const UserComplaintsSider: React.FC<UserComplaintsSiderProps> = ({ complaints, currentComplaintId }) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const navigate = useNavigate();

  const handleComplaintClick = (id: string) => {
    navigate(`/admin-home/feedback/${id}`);
  };

  return (
    <div className={`flex flex-col p-4 rounded-xl shadow-lg h-full overflow-y-auto ${
      theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
    }`}>
      <h3 className={`text-lg font-bold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}>User Complaints</h3>
      {
        complaints.length > 0 ? (
          complaints.map(complaint => (
            <div
              key={complaint.id}
              onClick={() => handleComplaintClick(complaint.id)}
              className={`flex flex-col p-3 mb-2 rounded-lg cursor-pointer ${
                complaint.id === currentComplaintId
                  ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : theme === 'dark' ? 'bg-[#1A2028] hover:bg-[#2C3745] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              } transition-colors duration-300`}
            >
              <div className="font-semibold text-sm truncate">{complaint.lastComplainSubject}</div>
              <div className={`text-xs ${
                complaint.id === currentComplaintId ? 'text-white opacity-80' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {complaint.lastComplainDate}
              </div>
            </div>
          ))
        ) : (
          <div className={`text-center py-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>No other complaints from this user.</div>
        )
      }
    </div>
  );
};

export default UserComplaintsSider; 