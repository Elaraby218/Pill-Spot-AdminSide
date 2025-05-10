import React from 'react'

const Category = () => {
  return (
    <div className="flex-1 flex flex-col gap-3">
          <div className="bg-base-100 rounded-3xl p-3">
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="categoryName" className="indent-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                className="bg-[#2C3745] p-2 rounded-2xl focus:outline-0 dark:bg-gray-300"
                placeholder="Type here"
              />
            </div>
            <button className="btn bg-[#2C3745] rounded-3xl w-30 flex justify-self-end dark:bg-gray-300">
              add
            </button>
          </div>

          
          <div className="bg-base-100 rounded-3xl p-3 flex flex-col gap-5 h-[63vh] overflow-auto">
            <input
              type="search"
              className="bg-[#2C3745] rounded-3xl indent-2 px-5 focus:outline-none focus:border-gray-500 focus:border-1 sticky top-0
                        dark:bg-gray-300
              "
              placeholder="Search for category ... "
            />
            <table className="w-full text-left rounded-2xl overflow-hidden">
              <thead className="bg-[#2C3745] text-white dark:bg-gray-300 dark:text-gray-600">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">#id</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-600">
                  <td className="px-4 py-2">Sample Name</td>
                  <td className="px-4 py-2">#123</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-400 hover:underline">
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-red-400 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr>
                  <td colSpan={4}>
                    <div className="h-[1px] bg-gray-500 w-full dark:bg-gray-600" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default Category
