import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClasses = {
    pending: 'badge-warning',
    accepted: 'badge-success',
    rejected: 'badge-error'
  };

  return (
    <div className={`badge ${statusClasses[status as keyof typeof statusClasses]} gap-2`}>
      {status === 'pending' && <span className="loading loading-spinner loading-xs"></span>}
      {status}
    </div>
  );
}; 