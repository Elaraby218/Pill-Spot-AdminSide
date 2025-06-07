import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../App/Store';

interface Complaint {
  id: string;
  userName: string;
  lastComplainDate: string;
  lastComplainSubject: string;
  numberOfComplains: number;
  status: string;
}

interface FeedbackTableRowProps {
  complaint: Complaint;
}

const FeedbackTableRow: React.FC<FeedbackTableRowProps> = ({ complaint }) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  return (
    <div className={`grid grid-cols-7 gap-4 p-4 mb-2 rounded-lg items-center text-sm ${
      theme === 'dark' ? 'bg-[#232B36] hover:bg-[#2C3745] text-white' : 'bg-white hover:bg-gray-50 text-gray-800 shadow-sm border border-gray-200'
    } transition-colors duration-300`}>
      <div className="font-medium">#{complaint.id}</div>
      <div>{complaint.userName}</div>
      <div>{complaint.lastComplainDate}</div>
      <div>{complaint.lastComplainSubject}</div>
      <div>{complaint.numberOfComplains}</div>
      <div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          complaint.status === 'Resolved' ? 'bg-green-200 text-green-800' :
          complaint.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
          'bg-red-200 text-red-800'
        }`}>
          {complaint.status}
        </span>
      </div>
      <div>
        <button className={`px-3 py-1 rounded-md text-white font-semibold ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } transition`}>
          View
        </button>
      </div>
    </div>
  );
};

export default FeedbackTableRow; 