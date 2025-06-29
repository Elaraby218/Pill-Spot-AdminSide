import React from 'react';
import { FaCheck, FaTimes, FaIdCard, FaMapMarkerAlt, FaClock, FaDownload } from 'react-icons/fa';
import { PharmacyRequest } from '../types';

interface PharmacyDetailsModalProps {
  request: PharmacyRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export const PharmacyDetailsModal: React.FC<PharmacyDetailsModalProps> = ({
  request,
  isOpen,
  onClose,
  onAccept,
  onReject
}) => {
  if (!request) return null;

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-24 h-24 rounded-lg">
                <img src={"https://localhost:7298"+request.logoURL} alt={request.name} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-base-content">{request.name}</h3>
              <p className="text-sm opacity-70 text-base-content">License ID: {request.licenseId}</p>
            </div>
          </div>
          {request.status === 'Pending' && (
            <div className="flex gap-2">
              <button 
                className="btn btn-success"
                onClick={() => onAccept(request.requestId)}
              >
                <FaCheck className="mr-2" /> Accept Request
              </button>
              <button 
                className="btn btn-error"
                onClick={() => onReject(request.requestId)}
              >
                <FaTimes className="mr-2" /> Reject Request
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="card-title text-base-content">
                <FaIdCard className="mr-2" /> Basic Information
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base-content">License ID:</span>
                  <span className="text-base-content">{request.licenseId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content">Contact Number:</span>
                  <span className="text-base-content">{request.contactNumber}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="card-title text-base-content">
                <FaMapMarkerAlt className="mr-2" /> Location Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base-content">City:</span>
                  <span className="text-base-content">{request.locationDto.cityDto.cityName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content">Government:</span>
                  <span className="text-base-content">{request.locationDto.cityDto.governmentReferenceDto.governmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content">Additional Info:</span>
                  <span className="text-base-content">{request.locationDto.additionalInfo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content">Coordinates:</span>
                  <span className="text-base-content">
                    {request.locationDto.latitude}, {request.locationDto.longitude}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 md:col-span-2">
            <div className="card-body">
              <h4 className="card-title text-base-content">
                <FaClock className="mr-2" /> Operating Hours
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base-content">Days Open:</span>
                  <span className="text-base-content">{request.daysOpen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content">24/7 Operation:</span>
                  <span className="text-base-content">{request.isOpen24 ? 'Yes' : 'No'}</span>
                </div>
                {!request.isOpen24 && (
                  <div className="flex justify-between">
                    <span className="text-base-content">Operating Hours:</span>
                    <span className="text-base-content">
                      {request.openingTime} - {request.closingTime}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop bg-base-300/50 backdrop-blur-sm">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}; 