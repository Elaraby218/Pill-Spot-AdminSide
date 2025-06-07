import React, { useState } from 'react'

interface Order {
  id: string;
  date: string;
  customer: string;
  phone: string;
  status: string;
  payment: string;
  price: string;
}

const PharOrders = () => {
  const today = new Date().toISOString().split('T')[0];
  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const thStyle = "px-4 py-4 text-center";
  
  // Sample data - replace with your actual data
  const orders = [
    { id: '#101', date: '10-12-2030', customer: 'Lila Ahmed', phone: '012345678910', status: 'Complete', payment: 'Cash', price: '120 L.E' },
    { id: '#102', date: '11-12-2030', customer: 'John Doe', phone: '012345678911', status: 'Pending', payment: 'Card', price: '150 L.E' },
    { id: '#103', date: '12-12-2030', customer: 'Jane Smith', phone: '012345678912', status: 'Reject', payment: 'Cash', price: '90 L.E' },
    { id: '#104', date: '13-12-2030', customer: 'Mike Johnson', phone: '012345678913', status: 'Approved', payment: 'Card', price: '200 L.E' },
  ];

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const dateInRange = (!start || orderDate >= start) && (!end || orderDate <= end);
    const statusMatch = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    
    return dateInRange && statusMatch;
  });

  const renderOrderRow = (order: Order) => (
    <tr key={order.id} className="my-2 hover:scale-102 duration-300 hover:bg-[#aaaaaa27] dark:bg-gray-300 dark:text-gray-700">
      <td className="px-4 py-2 border-l-4 border-green-400">{order.id}</td>
      <td className={thStyle}>{order.date}</td>
      <td className={thStyle}>{order.customer}</td>
      <td className={thStyle}>{order.phone}</td>
      <td className={thStyle}>{order.status}</td>
      <td className={thStyle}>{order.payment}</td>
      <td className={thStyle}>{order.price}</td>
      <td className={thStyle}>
        <span className="text-xl">⋮</span>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col mt-5 gap-5 w-full">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-3 text-[#dfe0fd] dark:text-gray-500">
          <span 
            className={`hover:underline cursor-pointer ${filterStatus === 'all' ? 'underline' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All orders
          </span>
          <span 
            className={`hover:underline cursor-pointer ${filterStatus === 'complete' ? 'underline' : ''}`}
            onClick={() => setFilterStatus('complete')}
          >
            Complete
          </span>
          <span 
            className={`hover:underline cursor-pointer ${filterStatus === 'pending' ? 'underline' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </span>
          <span 
            className={`hover:underline cursor-pointer ${filterStatus === 'reject' ? 'underline' : ''}`}
            onClick={() => setFilterStatus('reject')}
          >
            Reject
          </span>
          <span 
            className={`hover:underline cursor-pointer ${filterStatus === 'approved' ? 'underline' : ''}`}
            onClick={() => setFilterStatus('approved')}
          >
            Approved
          </span>
        </div>

        <div className="flex flex-1 gap-5 items-center justify-end">
          <input 
            type="date" 
            className="badge badge-soft" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className='dark:text-gray-700'>to</span>
          <input 
            type="date" 
            className="badge badge-soft" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-0 min-w-[600px]">
          <thead>
            <tr className="rounded-2xl badge-ghost sticky top-0 bg-gray-800 text-white dark:bg-gray-400">
              <th className={thStyle}>Id</th>
              <th className={thStyle}>Date</th>
              <th className={thStyle}>Customer Name</th>
              <th className={thStyle}>Phone</th>
              <th className={thStyle}>Order Status</th>
              <th className={thStyle}>Payment Method</th>
              <th className={thStyle}>Order Price</th>
              <th className={thStyle}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white">
            {filteredOrders.map(renderOrderRow)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PharOrders
