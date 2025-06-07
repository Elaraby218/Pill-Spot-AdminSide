import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../App/Store';

interface MessageProps {
  message: {
    id: string;
    sender: 'user' | 'admin';
    senderName: string;
    date: string;
    content: string;
    type: 'complain' | 'reply' | 'followUp';
    avatarUrl?: string;
  };
}

const ComplaintMessage: React.FC<MessageProps> = ({ message }) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-4 p-4 rounded-lg ${
      isUser ? 'justify-end' : 'justify-start'
    }`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700 overflow-hidden">
          {message.avatarUrl ? (
            <img src={message.avatarUrl} alt={message.senderName} className="w-full h-full rounded-full object-cover" />
          ) : (
            message.senderName[0]?.toUpperCase() || '?'
          )}
        </div>
      )}
      <div className={`flex flex-col p-4 rounded-xl max-w-[80%] ${
        isUser
          ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
          : theme === 'dark' ? 'bg-[#232B36] text-white' : 'bg-gray-200 text-gray-800'
      }`}>
        <div className={`flex justify-between items-center mb-2 ${
          isUser ? 'flex-row-reverse' : ''
        }`}>
          <span className="font-semibold text-sm">{message.senderName}</span>
          <span className="text-xs text-opacity-70">{message.date}</span>
        </div>
        <div className="ql-editor">
          <div className="text-sm break-words" dangerouslySetInnerHTML={{ __html: message.content }}></div>
        </div>
      </div>
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700 overflow-hidden">
          {message.avatarUrl ? (
            <img src={message.avatarUrl} alt={message.senderName} className="w-full h-full rounded-full object-cover" />
          ) : (
            message.senderName[0]?.toUpperCase() || '?'
          )}
        </div>
      )}
    </div>
  );
};

export default ComplaintMessage; 