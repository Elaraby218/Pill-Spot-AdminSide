import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../App/Store';
import { getUser } from '../Featurs/User/CurUser';

const CurrentUserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const curUser = useSelector((state: RootState) => state.curUserSlice.curUser);
  const status = useSelector((state: RootState) => state.curUserSlice.status);
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  // You can fetch user data if needed
  // useEffect(() => {
  //   if (!curUser) {
  //     dispatch(getUser('username')); // Replace with actual username
  //   }
  // }, [dispatch, curUser]);

  if (status === 'loading') {
    return (
      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (status === 'error' || !curUser) {
    return (
      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#232B36] text-white' : 'bg-white text-gray-800'}`}>
        <p>No user data available</p>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'}`}>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
          {curUser.profilePictureUrl ? (
            <img 
              src={curUser.profilePictureUrl} 
              alt={`${curUser.firstName} ${curUser.lastName}`} 
              className="w-full h-full rounded-full object-cover" 
            />
          ) : (
            curUser.userName[0].toUpperCase()
          )}
        </div>
        
        <div className="flex-1">
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {curUser.firstName} {curUser.lastName}
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {curUser.email}
          </p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            @{curUser.userName}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Phone Number
          </p>
          <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {curUser.phoneNumber}
          </p>
        </div>
        
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Gender
          </p>
          <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {curUser.gender}
          </p>
        </div>
        
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Date of Birth
          </p>
          <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {new Date(curUser.dateOfBirth).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserProfile; 