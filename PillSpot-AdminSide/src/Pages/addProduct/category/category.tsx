import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../App/Store';
import { addCategory, deleteCategory, getAllCategories, ICategory } from '../../../Featurs/category/categorySlice';
import { toast } from 'sonner';

interface CategoryProps {
  selectedCategory: ICategory | null;
  onSelectCategory: (category: ICategory | null) => void;
}

const Category: React.FC<CategoryProps> = ({ selectedCategory, onSelectCategory }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories = [], status } = useSelector((state: RootState) => state.categorySlice);
  const [categoryName, setCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
  //  console.log('Fetching categories...');
    dispatch(getAllCategories())
      .unwrap()
      .then((data) => {
        console.log('Categories fetched:', data);
      })
      .catch((error) => {
   //     console.error('Error fetching categories:', error);
          toast.error('Error fetching categories:', error)
      });
  }, [dispatch]);

  useEffect(() => {
  //  console.log('Categories in state:', categories);
    if (!categories) return;
    
    const filtered = categories.filter(category =>
      category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //console.log('Filtered categories:', filtered);
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    try {
      const result = await dispatch(addCategory(categoryName)).unwrap();
      console.log('Category added:', result);
      setCategoryName('');
      toast.success('Category added successfully');
      dispatch(getAllCategories());
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add category';
     // console.error('Error adding category:', error);
      toast.error(errorMessage);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setIsDeleting(categoryId);
      try {
        await dispatch(deleteCategory(categoryId)).unwrap();
        toast.success('Category deleted successfully');
        dispatch(getAllCategories());
        // Clear selection if the deleted category was selected
        if (selectedCategory?.categoryId === categoryId) {
          onSelectCategory(null);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete category';
        console.error('Error deleting category:', error);
        toast.error(errorMessage);
      } finally {
        setIsDeleting(null);
      }
    }
  };

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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="bg-[#2C3745] p-2 rounded-2xl focus:outline-0 dark:bg-gray-300"
            placeholder="Type here"
          />
        </div>
        <button 
          onClick={handleAddCategory}
          disabled={status === 'loading'}
          className="btn bg-[#2C3745] rounded-3xl w-30 flex justify-self-end dark:bg-gray-300"
        >
          {status === 'loading' ? 'Adding...' : 'Add'}
        </button>
      </div>

      <div className="bg-base-100 rounded-3xl p-3 flex flex-col gap-5 h-[63vh] overflow-auto">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#2C3745] rounded-3xl indent-2 px-5 focus:outline-none focus:border-gray-500 focus:border-1 sticky top-0
                    dark:bg-gray-300"
          placeholder="Search for category ... "
        />
        <table className="w-full text-left rounded-2xl overflow-hidden">
          <thead className="bg-[#2C3745] text-white dark:bg-gray-300 dark:text-gray-600">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  {status === 'loading' ? 'Loading categories...' : 'No categories found'}
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <React.Fragment key={category.categoryId}>
                  <tr 
                    className={`bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-600 cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-300 ${
                      selectedCategory?.categoryId === category.categoryId ? 'bg-gray-700 dark:bg-gray-400' : ''
                    }`}
                    onClick={() => onSelectCategory(category)}
                  >
                    <td className="px-4 py-2">{category.name}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-400 hover:underline">
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category.categoryId);
                        }}
                        disabled={isDeleting === category.categoryId}
                        className={`text-red-400 hover:underline ${isDeleting === category.categoryId ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isDeleting === category.categoryId ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <div className="h-[1px] bg-gray-500 w-full dark:bg-gray-600" />
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
