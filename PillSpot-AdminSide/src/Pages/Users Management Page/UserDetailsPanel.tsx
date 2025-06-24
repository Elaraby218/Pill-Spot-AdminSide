import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../App/Store';
import { updateUser, resetUpdateStatus, fetchAllUsers } from '../../Featurs/User/usersSlice';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
}

interface UserDetailsPanelProps {
  user: User;
  onUserUpdated: (user: User) => void;
  onUserDeleted: () => void;
}

interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  profilePicture?: FileList;
}

const UserDetailsPanel: React.FC<UserDetailsPanelProps> = ({ user, onUserUpdated, onUserDeleted }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const updateStatus = useSelector((state: RootState) => state.users.updateStatus);
  const updateError = useSelector((state: RootState) => state.users.updateError);
  const [lockout, setLockout] = useState(false);
  const API_BASE = 'https://localhost:7298';

  const { register, handleSubmit, reset } = useForm<UserFormValues>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
    }
  });

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '',
    });
  }, [user, reset]);

  useEffect(() => {
    if (updateStatus === 'success') {
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus, dispatch]);

  const onSubmit = async (data: UserFormValues) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('gender', data.gender);
    formData.append('dateOfBirth', data.dateOfBirth);
    
    if (data.profilePicture?.[0]) {
      formData.append('profilePicture', data.profilePicture[0]);
    }

    try {
      const resultAction = await dispatch(updateUser({ userName: user.userName, formData }));
      if (updateUser.fulfilled.match(resultAction)) {
        dispatch(fetchAllUsers(""));
        onUserUpdated(resultAction.payload);
      }
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleLockout = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/lockout`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to lockout user');
      setLockout(true);
    } catch (err: unknown) {
      console.error('Error locking out user:', err);
    }
  };

  const handleUnlock = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/unlock`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to unlock user');
      setLockout(false);
    } catch (err: unknown) {
      console.error('Error unlocking user:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      onUserDeleted();
    } catch (err: unknown) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-5 h-[calc(94vh-10rem)]">
      <div className={`w-full flex-[3] mx-auto rounded-2xl p-6 shadow space-y-6 ${
        theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
      }`}>
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 flex items-center justify-center text-4xl font-bold text-white mb-2 overflow-hidden">
            {user.profilePictureUrl ? (
              <img src={API_BASE+user.profilePictureUrl} alt={user.userName} className="w-full h-full rounded-full object-cover" />
            ) : (
              user.userName[0].toUpperCase()
            )}
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {user.firstName} {user.lastName}
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {user.email}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                First Name
              </label>
              <input
                type="text"
                {...register('firstName', { required: true })}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                  theme === 'dark' 
                    ? 'bg-[#1A2028] text-white border-[#2C3745]' 
                    : 'border-gray-300 focus:border-indigo-500'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Last Name
              </label>
              <input
                type="text"
                {...register('lastName', { required: true })}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                  theme === 'dark' 
                    ? 'bg-[#1A2028] text-white border-[#2C3745]' 
                    : 'border-gray-300 focus:border-indigo-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-[#2C3745]' 
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phoneNumber', { required: true })}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-[#2C3745]' 
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Gender
            </label>
            <select
              {...register('gender')}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-[#2C3745]' 
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Date of Birth
            </label>
            <input
              type="date"
              {...register('dateOfBirth', { required: true })}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-[#2C3745]' 
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
            />
          </div>

          {/* <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('profilePicture')}
              className={`mt-1 block w-full ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            />
          </div> */}

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              disabled={updateStatus === 'loading'}
              className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                updateStatus === 'loading'
                  ? 'bg-indigo-400'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {updateStatus === 'loading' ? 'Updating...' : 'Update User'}
            </button>
            <button
              type="button"
              onClick={lockout ? handleUnlock : handleLockout}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700"
            >
              {lockout ? 'Unlock User' : 'Lock User'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Delete User
            </button>
          </div>
        </form>

        {updateError && (
          <div className="mt-4 text-sm text-red-600">
            {updateError}
          </div>
        )}
        {updateStatus === 'success' && (
          <div className="mt-4 text-sm text-green-600">
            User updated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPanel; 