import { useState } from 'react';

interface User {
  id: string;
  userName: string;
  email: string;
  roles?: string[];
  // Add more fields as needed
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
  const [role, setRole] = useState(user.roles?.[0] || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Update email
  const handleUpdateEmail = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/update-email`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed to update email');
      setMessage('Email updated');
      onUserUpdated({ ...user, email });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error updating email');
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
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/update-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Failed to update password');
      setMessage('Password updated');
      setPassword('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  // Update role
  const handleUpdateRole = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error('Failed to update role');
      setMessage('Role updated');
      onUserUpdated({ ...user, roles: [role] });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error updating role');
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
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/lockout`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to lockout user');
      setMessage('User locked out');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error locking out user');
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
      const res = await fetch(`${API_BASE}/api/users/${user.userName}/unlock`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to unlock user');
      setMessage('User unlocked');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error unlocking user');
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
        <label className="block font-semibold">Role</label>
        <input value={role} onChange={e => setRole(e.target.value)} className="input input-bordered w-full" />
        <button onClick={handleUpdateRole} className="btn btn-sm btn-primary mt-1" disabled={loading}>Update Role</button>
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
