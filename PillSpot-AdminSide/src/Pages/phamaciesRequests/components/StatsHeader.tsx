import React from 'react';
import { PharmacyRequest } from '../types';

interface StatsHeaderProps {
  requests: PharmacyRequest[];
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ requests }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-base-content">Pharmacy Requests</h1>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title text-base-content">Total Requests</div>
          <div className="stat-value text-primary">{requests.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-base-content">Pending</div>
          <div className="stat-value text-warning">
            {requests.filter(r => r.status === 'Pending').length}
          </div>
        </div>
      </div>
    </div>
  );
}; 