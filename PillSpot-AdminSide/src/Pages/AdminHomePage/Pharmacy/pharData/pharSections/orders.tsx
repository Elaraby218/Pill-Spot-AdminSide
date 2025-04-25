import React from 'react'

const PharOrders = () => {


  const thStyle = "px-4 py-4 text-center";
  

  // will be renderred as a map 
  const row = 
  <tr className="my-2 hover:scale-102 duration-300 hover:bg-[#aaaaaa27] dark:bg-gray-300 dark:text-gray-700">
  <td className="px-4 py-2 border-l-4 border-green-400">#101</td>
  <td className={thStyle}>10-12-2030</td>
  <td className={thStyle}>Lila Ahmed</td>
  <td className={thStyle}>012345678910</td>
  <td className={thStyle}>Complete</td>
  <td className={thStyle}>Cash</td>
  <td className={thStyle}>120 L.E</td>
  <td className={thStyle}>
    <span className="text-xl">⋮</span>
  </td>
</tr>

  return (
    <div className="flex flex-col mt-5 gap-5 w-full">
    <div className="flex flex-col lg:flex-row justify-between gap-4">
      <div className="flex flex-wrap gap-3 text-[#dfe0fd] dark:text-gray-500">
        <span className="hover:underline cursor-pointer">All orders</span>
        <span className="hover:underline cursor-pointer">Complete</span>
        <span className="hover:underline cursor-pointer">Pending</span>
        <span className="hover:underline cursor-pointer">Reject</span>
        <span className="hover:underline cursor-pointer">Approved</span>
      </div>

      <div className="flex flex-1 gap-5 items-center justify-end">
        <input type="date" className="badge badge-soft" />
        <span className='dark:text-gray-700'>to</span>
        <input type="date" className="badge badge-soft" />
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
          
          {row}
          {row}
          {row}
          {row}
          {row}
          {row}
          {row}
          {row}
          {row}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default PharOrders
