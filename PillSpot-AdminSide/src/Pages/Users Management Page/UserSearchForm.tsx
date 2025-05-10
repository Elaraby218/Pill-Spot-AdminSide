import React from 'react';

interface UserSearchFormProps {
  userName: string;
  setUserName: (v: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ userName, setUserName, onSearch, loading }) => (
  <form onSubmit={onSearch} className="space-y-3 mb-4">
    <div className="text-lg font-bold text-white">User Search :</div>
    <div>
      <label className="text-sm text-white">User Name</label>
      <input
        type="text"
        className="input input-bordered w-full bg-[#232B36] text-white"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        placeholder="Type here"
      />
    </div>
    <button type="submit" className="btn w-full bg-[#232B36] text-white border border-[#2C3745]" disabled={loading}>
      {loading ? 'Searching...' : 'Search'}
    </button>
  </form>
);

export default UserSearchForm; 