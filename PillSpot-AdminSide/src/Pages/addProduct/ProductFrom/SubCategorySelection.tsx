import { UseFormRegister } from 'react-hook-form';
import { ProductFormData, SubCategory } from './types';

interface FormProps {
  register: UseFormRegister<ProductFormData>;
  errors: Record<string, { message?: string }>;
}

interface SubCategorySelectionProps extends FormProps {
  subCategorySearchTerm: string;
  setSubCategorySearchTerm: (term: string) => void;
  showSubCategoryDropdown: boolean;
  setShowSubCategoryDropdown: (show: boolean) => void;
  selectedCategoryId: string | null;
  isLoadingSubCategories: boolean;
  filteredSubCategories: SubCategory[];
  handleSubCategorySelect: (subCategory: SubCategory) => void;
}

const SubCategorySelection = ({
  subCategorySearchTerm,
  setSubCategorySearchTerm,
  showSubCategoryDropdown,
  setShowSubCategoryDropdown,
  selectedCategoryId,
  isLoadingSubCategories,
  filteredSubCategories,
  handleSubCategorySelect,
  register,
  errors
}: SubCategorySelectionProps) => (
  <div className="flex flex-col gap-4 w-full">
    <label htmlFor="subCategory" className="text-sm mb-1 block">Sub Category</label>
    <div className="relative">
      <input
        type="text"
        className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
        value={subCategorySearchTerm}
        onChange={(e) => {
          setSubCategorySearchTerm(e.target.value);
          setShowSubCategoryDropdown(true);
        }}
        onFocus={() => setShowSubCategoryDropdown(true)}
        onBlur={() => setTimeout(() => setShowSubCategoryDropdown(false), 200)}
        placeholder={selectedCategoryId ? "Search or select a subcategory" : "Select a category first"}
        disabled={!selectedCategoryId}
      />
      <input
        type="hidden"
        {...register('subCategory', {
          required: 'Sub Category is required'
        })}
      />
      {showSubCategoryDropdown && selectedCategoryId && (
        <div className="absolute z-10 w-full mt-1 bg-[#2C3745] border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
          {isLoadingSubCategories ? (
            <div className="p-2 text-gray-400">Loading subcategories...</div>
          ) : filteredSubCategories.length > 0 ? (
            filteredSubCategories.map((subCategory) => (
              <div
                key={subCategory.subCategoryId}
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onMouseDown={() => handleSubCategorySelect(subCategory)}
              >
                {subCategory.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400">No subcategories found</div>
          )}
        </div>
      )}
    </div>
    {errors.subCategory && (
      <span className="text-red-500 text-sm mt-1 block">{errors.subCategory.message}</span>
    )}
  </div>
);

export default SubCategorySelection; 