import React from 'react';
import { FaEye, FaCheck, FaTimes, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import { PharmacyRequest } from '../types';
import { StatusBadge } from './StatusBadge';

interface PharmacyTableProps {
  requests: PharmacyRequest[];
  onViewDetails: (request: PharmacyRequest) => void;
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export const PharmacyTable: React.FC<PharmacyTableProps> = ({
  requests,
  onViewDetails,
  onAccept,
  onReject
}) => {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th className="text-base-content">Pharmacy</th>
            <th className="text-base-content">Location</th>
            <th className="text-base-content">Contact</th>
            <th className="text-base-content">Operating Hours</th>
            <th className="text-base-content">Status</th>
            <th className="text-base-content">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.requestId} className="hover:bg-base-200">
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={import.meta.env.VITE_API_BASE_URL + request.logoURL} alt={request.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-base-content">{request.name}</div>
                    <div className="text-sm opacity-50 text-base-content">ID: {request.licenseId}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2 text-base-content">
                  <FaMapMarkerAlt className="text-primary" />
                  {`${request.locationDto.cityDto.cityName}, ${request.locationDto.cityDto.governmentReferenceDto.governmentName}`}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2 text-base-content">
                  <FaPhone className="text-primary" />
                  {request.contactNumber}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2 text-base-content">
                  <FaClock className="text-primary" />
                  {request.isOpen24 ? '24/7' : `${request.openingTime} - ${request.closingTime}`}
                </div>
              </td>
              <td><StatusBadge status={request.status} /></td>
              <td>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => onViewDetails(request)}
                  >
                    <FaEye className="mr-1" /> View
                  </button>
                  {request.status === 'Pending' && (
                    <>
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => onAccept(request.requestId)}
                      >
                        <FaCheck className="mr-1" /> Accept
                      </button>
                      <button 
                        className="btn btn-sm btn-error"
                        onClick={() => onReject(request.requestId)}
                      >
                        <FaTimes className="mr-1" /> Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 