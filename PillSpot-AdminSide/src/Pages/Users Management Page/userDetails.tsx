import { useState } from 'react';
import axiosInstance from '../../axiosInstance';

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

interface UserDetailsProps {
  user: User;
  onUserUpdated: (user: User) => void;
  onUserDeleted: () => void;
}

const API_BASE = 'https://localhost:7298';

const UserDetails = ({ user, onUserUpdated, onUserDeleted }: UserDetailsProps) => {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // role not in API response, keep for future
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>(user.gender);

  // Update email
  const handleUpdateEmail = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axiosInstance.put(`/api/users/${user.userName}/update-email`, { email });
      setMessage('Email updated');
      onUserUpdated({ ...user, email });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error updating email');
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const handleUpdatePassword = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axiosInstance.put(`/api/users/${user.userName}/update-password`, { password });
      setMessage('Password updated');
      setPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  // Lockout
  const handleLockout = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axiosInstance.post(`/api/users/${user.userName}/lockout`);
      setMessage('User locked out');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error locking out user');
    } finally {
      setLoading(false);
    }
  };

  // Unlock
  const handleUnlock = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axiosInstance.post(`/api/users/${user.userName}/unlock`);
      setMessage('User unlocked');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error unlocking user');
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axiosInstance.delete(`/api/users/${user.userName}`);
      setMessage('User deleted');
      onUserDeleted();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg bg-base-100">
      <h2 className="text-xl font-bold mb-2">User Details</h2>
      <div>
        <label className="block font-semibold">Username</label>
        <input value={user.userName} disabled className="input input-bordered w-full" />
      </div>
      <div>
        <label className="block font-semibold">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="input input-bordered w-full" />
        <button onClick={handleUpdateEmail} className="btn btn-sm btn-primary mt-1" disabled={loading}>Update Email</button>
      </div>
      <div>
        <label className="block font-semibold">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input input-bordered w-full" />
        <button onClick={handleUpdatePassword} className="btn btn-sm btn-primary mt-1" disabled={loading || !password}>Update Password</button>
      </div>
      <div>
        <label className="block font-semibold">Full Name</label>
        <input value={`${user.firstName} ${user.lastName}`} disabled className="input input-bordered w-full" />
      </div>
      <div>
        <label className="block font-semibold">Phone Number</label>
        <input value={user.phoneNumber} disabled className="input input-bordered w-full" />
      </div>
      <div>
        <label className="block font-semibold">Date of Birth</label>
        <input value={user.dateOfBirth} disabled className="input input-bordered w-full" />
      </div>
      <div>
        <label className="block font-semibold">Gender</label>
        <select value={gender} onChange={e => setGender(e.target.value as 'Male' | 'Female')} className="input input-bordered w-full" disabled>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={handleLockout} className="btn btn-warning" disabled={loading}>Lockout</button>
        <button onClick={handleUnlock} className="btn btn-success" disabled={loading}>Unlock</button>
        <button onClick={handleDelete} className="btn btn-error" disabled={loading}>Delete</button>
      </div>
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default UserDetails;
