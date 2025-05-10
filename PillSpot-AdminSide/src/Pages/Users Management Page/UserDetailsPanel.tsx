import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface User {
  id: string;
  userName: string;
  email: string;
  avatarUrl?: string;
  roles?: string[];
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  birthdate?: string;
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
  role: string;
  phone: string;
  gender: string;
  birthdate: string;
}

const UserDetailsPanel: React.FC<UserDetailsPanelProps> = ({ user, onUserUpdated, onUserDeleted }) => {
  const [lockout, setLockout] = useState(false); // You may want to fetch this from user object if available
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const API_BASE = 'https://localhost:7298';

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormValues>({
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      role: user.roles?.[0] || '',
      phone: user.phone || '',
      gender: user.gender || '',
      birthdate: user.birthdate || '',
    }
  });

  useEffect(() => {
    reset({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      role: user.roles?.[0] || '',
      phone: user.phone || '',
      gender: user.gender || '',
      birthdate: user.birthdate || '',
    });
  }, [user, reset]);

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update user');
      setMessage('User updated');
      onUserUpdated({ ...user, ...data, roles: [data.role] });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const handleLockout = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/lockout`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to lockout user');
      setMessage('User locked out');
      setLockout(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error locking out user');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/unlock`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to unlock user');
      setMessage('User unlocked');
      setLockout(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error unlocking user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      setMessage('User deleted');
      onUserDeleted();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="w-full flex-[3] mx-auto bg-[#232B36] rounded-2xl p-6 shadow space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 flex items-center justify-center text-4xl font-bold text-white mb-2 overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.userName} className="w-full h-full rounded-full object-cover" />
            ) : (
              user.userName[0].toUpperCase()
            )}
          </div>
          <div className="text-xl font-bold text-white mb-1">{user.userName}</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold">First Name</label>
              <input
                type="text"
                className="input input-bordered w-full bg-[#1A2028] text-white"
                {...register('firstName', { required: 'First name is required' })}
                placeholder="First Name"
              />
              {errors.firstName && <span className="text-red-400 text-sm">{errors.firstName.message}</span>}
            </div>
            <div>
              <label className="block text-white font-semibold">Last Name</label>
              <input
                type="text"
                className="input input-bordered w-full bg-[#1A2028] text-white"
                {...register('lastName', { required: 'Last name is required' })}
                placeholder="Last Name"
              />
              {errors.lastName && <span className="text-red-400 text-sm">{errors.lastName.message}</span>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-white font-semibold">Phone</label>
              <input
                type="tel"
                className="input input-bordered w-full bg-[#1A2028] text-white"
                {...register('phone', {
                  required: 'Phone is required',
                  minLength: { value: 8, message: 'Phone must be at least 8 digits' },
                })}
                placeholder="Phone"
              />
              {errors.phone && <span className="text-red-400 text-sm">{errors.phone.message}</span>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-white font-semibold">Gender</label>
              <select
                className="input input-bordered w-full bg-[#1A2028] text-white"
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-red-400 text-sm">{errors.gender.message}</span>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-white font-semibold">Birthdate</label>
              <input
                type="date"
                className="input input-bordered w-full bg-[#1A2028] text-white"
                {...register('birthdate', { required: 'Birthdate is required' })}
                placeholder="Birthdate"
              />
              {errors.birthdate && <span className="text-red-400 text-sm">{errors.birthdate.message}</span>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-white font-semibold">Email</label>
              <input
                type="email"
                className="input input-bordered w-full bg-[#1A2028] text-white"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="Email"
              />
              {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-white font-semibold">Role</label>
              <input
                type="text"
                className="input input-bordered w-full bg-[#1A2028] text-white"
                {...register('role', { required: 'Role is required' })}
                placeholder="Role"
              />
              {errors.role && <span className="text-red-400 text-sm">{errors.role.message}</span>}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-white font-semibold">Lockout Status:</span>
            <span className={lockout ? 'text-red-400' : 'text-green-400'}>
              {lockout ? 'Locked' : 'Active'}
            </span>
          </div>
          <button type="submit" className="w-full h-12 mt-6 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
          {message && <div className="text-green-400 font-semibold mt-2">{message}</div>}
          {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
        </form>
      </div>
      <div className="w-full flex flex-col flex-[1] mx-auto bg-[#232B36] rounded-2xl p-6 shadow space-y-6">
        <div className="flex flex-wrap gap-3 mt-4 flex-col justify-around h-[50vh]">
          <button onClick={handleLockout} className="w-3xs h-20 bg-base-100 rounded-2xl hover:bg-base-200 duration-300 cursor-pointer" disabled={loading || lockout}>Lockout</button>
          <button onClick={handleUnlock} className="w-3xs h-20 bg-base-100 rounded-2xl hover:bg-base-200 duration-300 cursor-pointer" disabled={loading || !lockout}>Unlock</button>
          <button onClick={handleDelete} className="w-3xs h-20 bg-base-100 rounded-2xl hover:bg-base-200 duration-300 cursor-pointer" disabled={loading}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPanel; 