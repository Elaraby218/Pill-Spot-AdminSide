import React, { useState, useEffect } from 'react';
import { ICategory } from '../../../Featurs/category/categorySlice';
import axiosInstance from '../../../axiosInstance';
import { toast } from 'sonner';

interface ISubCategory {
  subCategoryId: string;
  name: string;
  categoryId: string;
}

interface SubCategoryProps {
  selectedCategory: ICategory | null;
  onSelectSubCategory: (subCategoryId: string) => void;
}

const SubCategory: React.FC<SubCategoryProps> = ({ selectedCategory, onSelectSubCategory }) => {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);

  const fetchSubCategories = async (categoryId: string) => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(
        `/api/categories/${categoryId}/subcategories?PageNumber=1&PageSize=1000000`
      );
      setSubCategories(response.data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch subcategories';
      toast.error(errorMessage);
    } finally {
      setIsFetching(false);
    }
    setSelectedSubCategoryId(null); // Reset selection when category changes
  };

  useEffect(() => {
    if (selectedCategory?.categoryId) {
      fetchSubCategories(selectedCategory.categoryId);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory?.categoryId]);

  const handleAddSubCategory = async () => {
    if (!selectedCategory?.categoryId || !subCategoryName.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post(
        `/api/categories/${selectedCategory.categoryId}/subcategories`,
        { name: subCategoryName.trim() }
      );
      
      toast.success('Subcategory added successfully');
      setSubCategoryName('');
      // Refresh the subcategories list after adding
      fetchSubCategories(selectedCategory.categoryId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add subcategory';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubCategory = async (subCategoryId: string) => {
    if (!selectedCategory?.categoryId) return;

    setDeletingId(subCategoryId);
    try {
      await axiosInstance.delete(
        `/api/categories/${selectedCategory.categoryId}/subcategories/${subCategoryId}`
      );
      
      toast.success('Subcategory deleted successfully');
      // Refresh the subcategories list after deleting
      fetchSubCategories(selectedCategory.categoryId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete subcategory';
      toast.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
    onSelectSubCategory(subCategoryId);
  };

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-2 flex flex-col bg-base-100 rounded-3xl p-5 h-[80vh] overflow-auto">
      <div className="flex gap-6 items-center justify-center">
        <div className="flex flex-col flex-1">
          <label className="mb-1 dark:text-gray-700">Category Name</label>
          <input
            type="text"
            className="p-2 rounded-xl bg-[#2C3745] focus:outline-none dark:bg-gray-300"
            value={selectedCategory?.name || ''}
            disabled
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 dark:text-gray-700">Category ID</label>
          <input
            type="text"
            className="p-2 rounded-xl bg-[#2C3745] focus:outline-none dark:bg-gray-300"
            value={selectedCategory?.categoryId || ''}
            disabled
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
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            disabled={!selectedCategory || isLoading}
            placeholder="Enter subcategory name"
          />
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-xl disabled:opacity-50"
          onClick={handleAddSubCategory}
          disabled={!selectedCategory || !subCategoryName.trim() || isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>

      <hr className="border-gray-300 block my-5" />

      <div className="flex items-end gap-4">
        <input
          type="text"
          placeholder="Search subcategories..."
          className="flex-1 p-2 rounded-xl border border-gray-300 dark:placeholder:text-gray-300 placeholder:text-gray-500 sticky top-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={!selectedCategory}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-3 h-[50vh] overflow-auto">
        {!selectedCategory ? (
          <div className="col-span-2 text-center py-4 text-gray-500">
            Please select a category first
          </div>
        ) : isFetching ? (
          <div className="col-span-2 text-center py-4 text-gray-500">
            Loading subcategories...
          </div>
        ) : filteredSubCategories.length === 0 ? (
          <div className="col-span-2 text-center py-4 text-gray-500">
            {searchQuery ? 'No matching subcategories found' : 'No subcategories found'}
          </div>
        ) : (
          filteredSubCategories.map((subCategory) => (
            <div
              key={subCategory.subCategoryId}
              className={`flex items-center justify-between p-3 rounded-xl dark:bg-gray-300 bg-[#2C3745] max-h-14 cursor-pointer ${
                selectedSubCategoryId === subCategory.subCategoryId ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleSubCategoryClick(subCategory.subCategoryId)}
            >
              <span className="dark:text-gray-800">{subCategory.name}</span>
              <div className="flex gap-3">
                <button className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button 
                  className="text-red-600 hover:underline disabled:opacity-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubCategory(subCategory.subCategoryId);
                  }}
                  disabled={deletingId === subCategory.subCategoryId}
                >
                  {deletingId === subCategory.subCategoryId ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubCategory;
