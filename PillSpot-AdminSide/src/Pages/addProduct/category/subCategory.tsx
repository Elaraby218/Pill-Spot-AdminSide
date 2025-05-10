import{ useState } from 'react'

const SubCategoy = () => {

  
    const [subCategories] = useState<string[]>([
        "Sub Category 1",
        "Sub Category 2",
        "Sub Category 3",
        "Sub Category 4",
        "Sub Category 5",
        "Sub Category 6",
        "Sub Category 7",
        "Sub Category 8",
        "Sub Category 9",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10",
        "Sub Category 10","Sub Category 10","Sub Category 10","Sub Category 10",
      ]);



  return (
    <div className="flex-2 flex flex-col bg-base-100 rounded-3xl p-5 h-[80vh] overflow-auto">
          <div className="flex gap-6 items-center justify-center">
            <div className="flex flex-col flex-1">
              <label className="mb-1 dark:text-gray-700">Category Name</label>
              <input
                type="text"
                className="p-2 rounded-xl bg-[#2C3745] focus:outline-none dark:bg-gray-300"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1  dark:text-gray-700">Category ID</label>
              <input
                type="text"
                className="p-2 rounded-xl bg-[#2C3745] focus:outline-none dark:bg-gray-300"
              />
            </div>
          </div>

          <hr className="border-gray-300 block my-5" />

      
          <div className="flex gap-4 items-end">
            <div className="flex flex-col flex-1">
              <label className="mb-1 dark:text-gray-700">Sub Category Name</label>
              <input
                type="text"
                className="p-2 rounded-xl bg-[#2C3745] focus:outline-none dark:bg-gray-300"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">
              Add
            </button>
          </div>

          <hr className="border-gray-300 block my-5" />

          {/* Current Subcategories + Search */}
          <div className="flex items-end gap-4">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 p-2 rounded-xl border border-gray-300 dark:placeholder:text-gray-300 placeholder:text-gray-500 sticky top-0"
            />
          </div>
          
          {/* Subcategories list */}
          <div className="grid grid-cols-2 gap-4 mt-3 h-[50vh] overflow-auto">
            {subCategories.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl dark:bg-gray-300 bg-[#2C3745] "
              >
                <span className="dark:text-gray-800">{name}</span>
                <div className="flex gap-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default SubCategoy
