import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { X } from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import { toast } from 'sonner';
import { CosmeticProduct } from '../../../hooks/useCosmeticProducts';

interface Category {
  categoryId: string;
  name: string;
}

interface SubCategory {
  subCategoryId: string;
  name: string;
  categoryId?: string;
}

interface EditCosmeticModalProps {
  product: CosmeticProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CosmeticFormData) => void;
  refreshCosmetics: () => void;
}

interface CosmeticFormData {
  name: string;
  brand: string;
  skinType: string;
  volume: string;
  category: string;
  subCategory: string;
  description: string;
  price: string;
  usageInstructions: string;
  image: FileList;
}

const EditCosmeticModal = ({ product, isOpen, onClose, onSave, refreshCosmetics }: EditCosmeticModalProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subCategorySearchTerm, setSubCategorySearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CosmeticFormData>();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/api/categories?PageNumber=1&PageSize=10000');
        setCategories(response.data);
      } catch {
        toast.error('Error fetching categories');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategoryId) {
        setIsLoadingSubCategories(true);
        try {
          const response = await axiosInstance.get(`/api/categories/${selectedCategoryId}/subcategories`);
          setSubCategories(response.data);
        } catch {
          toast.error('Error fetching subcategories');
          setSubCategories([]);
        } finally {
          setIsLoadingSubCategories(false);
        }
      } else {
        setSubCategories([]);
      }
    };
    fetchSubCategories();
  }, [selectedCategoryId]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(subCategorySearchTerm.toLowerCase())
  );

  const handleCategorySelect = (category: Category) => {
    setValue('category', category.name);
    setSearchTerm(category.name);
    setShowDropdown(false);
    setSelectedCategoryId(category.categoryId);
    setValue('subCategory', '');
    setSubCategorySearchTerm('');
    setShowSubCategoryDropdown(true);
  };

  const handleSubCategorySelect = (subCategory: SubCategory) => {
    setValue('subCategory', subCategory.subCategoryId);
    setSubCategorySearchTerm(subCategory.name);
    setShowSubCategoryDropdown(false);
  };

  useEffect(() => {
    const initializeForm = async () => {
      if (product && isOpen) {
        setValue('name', product.name);
        setValue('brand', product.brand);
        setValue('skinType', product.skinType);
        setValue('volume', product.volume.toString());
        setValue('description', product.description);
        setValue('price', product.price.toString());
        setValue('usageInstructions', product.usageInstructions);
        
        // Set image preview using imageURL
        setPreview(product.imageURL ? `https://localhost:7298${product.imageURL}` : null);
        
        // Set category and subcategory from the product's subCategoryDto structure
        if (product.subCategoryDto) {
          const categoryName = product.subCategoryDto.categoryDto.name;
          const categoryId = product.subCategoryDto.categoryDto.categoryId;
          const subCategoryName = product.subCategoryDto.name;
          const subCategoryId = product.subCategoryDto.subCategoryId;
          
          setValue('category', categoryName);
          setValue('subCategory', subCategoryId);
          setSearchTerm(categoryName);
          setSubCategorySearchTerm(subCategoryName);
          setSelectedCategoryId(categoryId);
          
          // Fetch subcategories for the selected category to populate the dropdown
          try {
            const response = await axiosInstance.get(`/api/categories/${categoryId}/subcategories`);
            setSubCategories(response.data);
          } catch (error) {
            console.error('Error fetching subcategories for initialization:', error);
          }
        }
      } else {
        reset();
        setPreview(null);
        setSearchTerm('');
        setSubCategorySearchTerm('');
        setSelectedCategoryId(null);
      }
    };

    initializeForm();
  }, [product, isOpen, setValue, reset]);

  const handleFormSubmit: SubmitHandler<CosmeticFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('Name', data.name);
      formData.append('Brand', data.brand);
      formData.append('SkinType', data.skinType);
      formData.append('Volume', data.volume);
      formData.append('SubCategoryId', data.subCategory);
      formData.append('Description', data.description);
      formData.append('Price', data.price);
      formData.append('UsageInstructions', data.usageInstructions);
      if (data.image && data.image[0]) {
        formData.append('Image', data.image[0]);
      }
      await axiosInstance.patch(`/api/cosmetics/${product?.productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Cosmetic updated successfully!');
      onSave(data);
      refreshCosmetics();
      onClose();
    } catch {
      toast.error('Failed to update cosmetic.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-[#2C3745] dark:bg-gray-300 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-600/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600/50">
          <h2 className="text-2xl font-bold text-white dark:text-gray-800">
            Edit Cosmetic
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-600/50 dark:hover:bg-gray-400/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-300 dark:text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                    Product Name *
                  </label>
                  <input
                    {...register('name', { required: 'Product name is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                    Brand *
                  </label>
                  <input
                    {...register('brand', { required: 'Brand is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                    placeholder="Enter brand name"
                  />
                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-400">{errors.brand.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                    Skin Type *
                  </label>
                  <select
                    {...register('skinType', { required: 'Skin type is required' })}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                  >
                    <option value="">Select a skin type</option>
                    <option value="Normal">Normal</option>
                    <option value="Oily">Oily</option>
                    <option value="Dry">Dry</option>
                    <option value="Combination">Combination</option>
                    <option value="Sensitive">Sensitive</option>
                  </select>
                  {errors.skinType && (
                    <p className="mt-1 text-sm text-red-400">{errors.skinType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                    Volume (ml) *
                  </label>
                  <input
                    {...register('volume', { 
                      required: 'Volume is required',
                      min: { value: 0, message: 'Volume must be positive' }
                    })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                    placeholder="e.g., 50"
                  />
                  {errors.volume && (
                    <p className="mt-1 text-sm text-red-400">{errors.volume.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                    Price *
                  </label>
                  <input
                    {...register('price', { 
                      required: 'Price is required',
                      pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' }
                    })}
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-400">{errors.price.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                  Product Image
                </label>
                <div className="relative border border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400 focus-within:border-white">
                  <input
                    {...register('image')}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  {preview ? (
                    <div className="w-full h-48 relative">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-fill"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white">Change image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 flex flex-col items-center justify-center p-4 bg-[#2C3745] dark:bg-gray-300">
                      <div className="w-8 h-8 mb-2 text-gray-400">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-gray-400">Upload new image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                  placeholder="Search categories..."
                />
                {showDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-[#2C3745] dark:bg-gray-300 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {isLoading ? (
                      <div className="p-3 text-center text-gray-400">Loading...</div>
                    ) : filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <button
                          key={category.categoryId}
                          type="button"
                          onClick={() => handleCategorySelect(category)}
                          className="w-full px-3 py-2 text-left hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-800"
                        >
                          {category.name}
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-400">No categories found</div>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                  Sub Category *
                </label>
                <input
                  type="text"
                  value={subCategorySearchTerm}
                  onChange={(e) => setSubCategorySearchTerm(e.target.value)}
                  onFocus={() => setShowSubCategoryDropdown(true)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                  placeholder="Search sub categories..."
                  disabled={!selectedCategoryId}
                />
                {showSubCategoryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-[#2C3745] dark:bg-gray-300 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {isLoadingSubCategories ? (
                      <div className="p-3 text-center text-gray-400">Loading...</div>
                    ) : filteredSubCategories.length > 0 ? (
                      filteredSubCategories.map((subCategory) => (
                        <button
                          key={subCategory.subCategoryId}
                          type="button"
                          onClick={() => handleSubCategorySelect(subCategory)}
                          className="w-full px-3 py-2 text-left hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-800"
                        >
                          {subCategory.name}
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-400">No sub categories found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                Description *
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
              )}
            </div>

            {/* Usage Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                Usage Instructions *
              </label>
              <textarea
                {...register('usageInstructions', { required: 'Usage instructions are required' })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                placeholder="Enter usage instructions"
              />
              {errors.usageInstructions && (
                <p className="mt-1 text-sm text-red-400">{errors.usageInstructions.message}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-600/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 dark:text-gray-600 hover:bg-gray-600/50 dark:hover:bg-gray-400/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCosmeticModal; 