import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../App/Store';
import ComplaintHeader from './components/ComplaintHeader';
import ComplaintMessage from './components/ComplaintMessage';
import MessageInput from './components/MessageInput';
import UserComplaintsSider from './components/UserComplaintsSider';

interface Message {
  id: string;
  sender: 'user' | 'admin';
  senderName: string;
  date: string;
  content: string;
  type: 'complain' | 'reply' | 'followUp';
  avatarUrl?: string;
}

interface ComplaintDetail {
  id: string;
  userName: string;
  lastComplainDate: string;
  lastComplainSubject: string;
  numberOfComplains: number;
  status: 'Pending' | 'Resolved' | 'Open';
  messages: Message[];
}

const ComplaintDetailsPage: React.FC = () => {
  const { complaintId } = useParams<{ complaintId: string }>();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  const [complaint, setComplaint] = useState<ComplaintDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for complaints (replace with actual API call)
  const mockComplaints: ComplaintDetail[] = [
    {
      id: '1',
      userName: 'johndoe',
      lastComplainDate: '2023-01-15',
      lastComplainSubject: 'Login issue',
      numberOfComplains: 3,
      status: 'Pending',
      messages: [
        { id: 'msg1', sender: 'user', senderName: 'johndoe', date: '2023-01-15', content: 'I cannot log in to my account. It keeps saying invalid credentials.', type: 'complain' },
        { id: 'msg2', sender: 'admin', senderName: 'Admin A', date: '2023-01-15', content: 'Please provide your username and the error message you are seeing.', type: 'reply' },
        { id: 'msg3', sender: 'user', senderName: 'johndoe', date: '2023-01-15', content: 'My username is johndoe, and the error is \'Invalid username or password\'.', type: 'reply' },
      ],
    },
    {
      id: '2',
      userName: 'janedoe',
      lastComplainDate: '2023-01-10',
      lastComplainSubject: 'Payment error',
      numberOfComplains: 1,
      status: 'Resolved',
      messages: [
        { id: 'msg4', sender: 'user', senderName: 'janedoe', date: '2023-01-10', content: 'My payment for the last order failed.', type: 'complain' },
        { id: 'msg5', sender: 'admin', senderName: 'Admin B', date: '2023-01-10', content: 'We have identified an issue with your payment method and have resolved it. Please try again.', type: 'reply' },
      ],
    },
    {
      id: '3',
      userName: 'johndoe',
      lastComplainDate: '2023-01-20',
      lastComplainSubject: 'Password Reset Issue',
      numberOfComplains: 2,
      status: 'Open',
      messages: [
        { id: 'msg6', sender: 'user', senderName: 'johndoe', date: '2023-01-20', content: 'I am unable to reset my password. The link is not working.', type: 'complain' },
        { id: 'msg7', sender: 'admin', senderName: 'Admin C', date: '2023-01-20', content: 'Have you tried clearing your browser cache and cookies?', type: 'reply' },
      ],
    },
    {
      id: '4',
      userName: 'johndoe',
      lastComplainDate: '2023-01-25',
      lastComplainSubject: 'Profile Update Error',
      numberOfComplains: 1,
      status: 'Pending',
      messages: [
        { id: 'msg8', sender: 'user', senderName: 'johndoe', date: '2023-01-25', content: 'My profile details are not saving after I update them.', type: 'complain' },
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchedComplaint = mockComplaints.find(c => c.id === complaintId);
    if (fetchedComplaint) {
      setComplaint(fetchedComplaint);
      setError(null);
    } else {
      setError('Complaint not found.');
      setComplaint(null);
    }
    setLoading(false);
  }, [complaintId]);

  const handleGoToUserProfile = () => {
    if (complaint) {
      console.log(`Navigating to user profile for: ${complaint.userName}`);
    }
  };

  const handleChatSearch = (query: string) => {
    console.log(`Searching chat for: ${query}`);
  };

  const handleSendMessage = (content: string) => {
    if (complaint) {
      const newMessage: Message = {
        id: `msg${complaint.messages.length + 1}`,
        sender: 'admin', 
        senderName: 'Admin',
        date: new Date().toISOString().split('T')[0],
        content: content,
        type: 'reply',
      };
      setComplaint({ ...complaint, messages: [...complaint.messages, newMessage] });
    }
  };

  const handleMarkAsSolved = () => {
    if (complaint) {
      setComplaint({ ...complaint, status: 'Resolved' });
      console.log(`Complaint ${complaint.id} marked as Solved`);
      // Optionally navigate back or show a confirmation
    }
  };

  const handleGoToComplaintsTable = () => {
    navigate('/admin-home/feedback');
  };

  if (loading) {
    return <div className={`flex items-center justify-center h-full ${
      theme === 'dark' ? 'text-white' : 'text-gray-800'
    }`}>Loading complaint details...</div>;
  }

  if (error) {
    return <div className={`flex items-center justify-center h-full text-red-500`}>{error}</div>;
  }

  if (!complaint) {
    return <div className={`flex items-center justify-center h-full ${
      theme === 'dark' ? 'text-white' : 'text-gray-800'
    }`}>Complaint not found. Please select a valid complaint.</div>;
  }

  const userComplaints = mockComplaints.filter(c => c.userName === complaint.userName);

  return (
    <div className="flex flex-col h-[86vh] w-full gap-4 p-4">
      <ComplaintHeader
        onGoToUserProfile={handleGoToUserProfile}
        onChatSearch={handleChatSearch}
        onGoToComplaintsTable={handleGoToComplaintsTable}
      />

    

      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="flex flex-col w-64 gap-4">
          <UserComplaintsSider
            complaints={userComplaints.map(c => ({ id: c.id, lastComplainSubject: c.lastComplainSubject, lastComplainDate: c.lastComplainDate }))}
            currentComplaintId={complaint.id}
          />
          <div className={`flex justify-end p-4 rounded-xl shadow-lg ${
            theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
          }`}>
            <button
              onClick={handleMarkAsSolved}
              className={`px-6 py-3 rounded-md font-semibold ${
                complaint.status === 'Resolved'
                  ? 'bg-green-600 cursor-not-allowed opacity-50'
                  : theme === 'dark' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-400 hover:bg-green-500'
              } text-white transition`}
              disabled={complaint.status === 'Resolved'}
            >
              {complaint.status === 'Resolved' ? 'Solved' : 'Mark as Solved'}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-row overflow-hidden">
          <div className={`flex-1 flex flex-col overflow-y-auto p-4 rounded-xl shadow-lg space-y-4 ${
            theme === 'dark' ? 'bg-[#1A2028]' : 'bg-gray-100'
          }`}>
            {complaint.messages.map(message => (
              <ComplaintMessage key={message.id} message={message} />
            ))}
          </div>
          <div className="flex-1 flex flex-col pl-4 h-[calc(100vh-9rem)]">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsPage; 