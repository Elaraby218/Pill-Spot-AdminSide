import { UseFormRegister } from 'react-hook-form';
import { ProductFormData, Category } from './types';

interface FormProps {
  register: UseFormRegister<ProductFormData>;
  errors: Record<string, { message?: string }>;
}

interface CategorySelectionProps extends FormProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  isLoading: boolean;
  filteredCategories: Category[];
  handleCategorySelect: (category: Category) => void;
}

const CategorySelection = ({
  searchTerm,
  setSearchTerm,
  showDropdown,
  setShowDropdown,
  isLoading,
  filteredCategories,
  handleCategorySelect,
  register,
  errors
}: CategorySelectionProps) => (
  <div className="flex flex-col gap-4 w-full">
    <label htmlFor="category" className="text-sm mb-1 block">Category</label>
    <div className="relative">
      <input
        type="text"
        className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        placeholder="Search or select a category"
      />
      <input
        type="hidden"
        {...register('category', {
          required: 'Category is required'
        })}
      />
      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-[#2C3745] border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-2 text-gray-400">Loading categories...</div>
          ) : filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.categoryId}
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onMouseDown={() => handleCategorySelect(category)}
              >
                {category.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400">No categories found</div>
          )}
        </div>
      )}
    </div>
    {errors.category && (
      <span className="text-red-500 text-sm mt-1 block">{errors.category.message}</span>
    )}
  </div>
);

export default CategorySelection; 