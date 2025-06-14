import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PharmacyRequest } from './types';
import { StatsHeader } from './components/StatsHeader';
import { PharmacyTable } from './components/PharmacyTable';
import { PharmacyDetailsModal } from './components/PharmacyDetailsModal';
import { fetchPharmacyRequests, acceptPharmacyRequest, rejectPharmacyRequest } from '../../Featurs/pharmacy/pharmacyRequestsSlice';
import { RootState, AppDispatch } from '../../App/Store';

const PharmaciesRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { requests, loading, error } = useSelector((state: RootState) => state.pharmacyRequests);
  const [selectedRequest, setSelectedRequest] = useState<PharmacyRequest | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchPharmacyRequests());
  }, [dispatch]);

  const handleViewDetails = (request: PharmacyRequest) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleAccept = async (id: number) => {
    try {
      await dispatch(acceptPharmacyRequest(id)).unwrap();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await dispatch(rejectPharmacyRequest(id)).unwrap();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-error">{error}</div>;
  }

  return (
    <div className="p-6">
      <StatsHeader requests={requests} />
      <PharmacyTable 
        requests={requests}
        onViewDetails={handleViewDetails}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      <PharmacyDetailsModal
        request={selectedRequest}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default PharmaciesRequests;
