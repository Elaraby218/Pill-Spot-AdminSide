import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Upload } from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import { addProduct } from '../../../Featurs/product/productSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../App/Store';

interface Category {
  Id: string;
  name: string;
  categoryId: string;
}

interface SubCategory {
  subCategoryId: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  dosage: string;
  price: string;
  manufacturer: string;
  sideEffects: string;
  usageInstructions: string;
  requiresPrescription: boolean;
  image: string | null;
}

interface ProductFormData {
  name: string;
  category: string;
  subCategory: string;
  description: string;
  dosage: string;
  price: string;
  manufacturer: string;
  sideEffects: string;
  usageInstructions: string;
  requiresPrescription: boolean;
  image: FileList;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  editingProduct: Product | null;
}

const ProductForm = ({ onSubmit, editingProduct }: ProductFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
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
  } = useForm<ProductFormData>();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/api/categories?PageNumber=1&PageSize=10000');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category is selected
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategoryId) {
        setIsLoadingSubCategories(true);
        try {
          const response = await axiosInstance.get(`/api/categories/${selectedCategoryId}/subcategories`);
          setSubCategories(response.data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
          setSubCategories([]); // Clear subcategories on error
        } finally {
          setIsLoadingSubCategories(false);
        }
      } else {
        setSubCategories([]);
      }
    };
    fetchSubCategories();
  }, [selectedCategoryId]);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter subcategories based on search term
  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(subCategorySearchTerm.toLowerCase())
  );

  const handleCategorySelect = (category: Category) => {
    setValue('category', category.name);
    setSearchTerm(category.name);
    setShowDropdown(false);
    setSelectedCategoryId(category.categoryId);
    setValue('subCategory', ''); // Clear subcategory when category changes
    setSubCategorySearchTerm(''); // Clear subcategory search
    setShowSubCategoryDropdown(true); // Show subcategory dropdown after selection
  };

  const handleSubCategorySelect = (subCategory: SubCategory) => {
    setValue('subCategory', subCategory.subCategoryId);
    setSubCategorySearchTerm(subCategory.name);
    setShowSubCategoryDropdown(false);
  };

  useEffect(() => {
    if (editingProduct) {
      setValue('name', editingProduct.name);
      setValue('category', editingProduct.category);
      setValue('subCategory', editingProduct.subCategory);
      setValue('description', editingProduct.description);
      setValue('dosage', editingProduct.dosage);
      setValue('price', editingProduct.price);
      setValue('manufacturer', editingProduct.manufacturer);
      setValue('sideEffects', editingProduct.sideEffects || '');
      setValue('usageInstructions', editingProduct.usageInstructions);
      setValue('requiresPrescription', editingProduct.requiresPrescription);
      setPreview(editingProduct.image);
    } else {
      reset();
      setPreview(null);
    }
  }, [editingProduct, setValue, reset]);

  const handleFormSubmit: SubmitHandler<ProductFormData> = (data) => {
    const transformedData: ProductFormData = {
      ...data,
      price: parseFloat(data.price).toFixed(2),
      requiresPrescription: Boolean(data.requiresPrescription),

      image: data.image,

    };

    if (editingProduct) {
      // Handle edit case if needed
      onSubmit(transformedData);
    } else {
      // Handle add case using Redux
      dispatch(addProduct(transformedData));
      reset();
      setPreview(null);
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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="h-[70vh] space-y-3 overflow-auto">


      <div className="flex flex-col gap-4">
        <div className="flex w-full gap-4">
          <div className="w-full">
            <label htmlFor="name" className="text-sm mb-1 block">name</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>
            )}

            <label htmlFor="manufacturer" className="text-sm  mb-1 block">manufacturer</label>
            <input
              id="manufacturer"
              type="text"
              className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
              {...register('manufacturer', {
                required: 'Manufacturer is required'
              })}
            />
            {errors.manufacturer && (
              <span className="text-red-500 text-sm mt-1 block">{errors.manufacturer.message}</span>
            )}

            <div>
              <label htmlFor="price" className="text-sm  mb-1 block">price</label>
              <input
                id="price"
                type="text"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
                {...register('price', {
                  required: 'Price is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Enter a valid price (e.g., 10.99)'
                  }
                })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm mt-1 block">{errors.price.message}</span>
              )}
            </div>

          </div>

          <div className="w-full">
            <div className="relative border w-sm border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400 focus-within:border-white">
              <input
                type="file"
                id="image"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                {...register('image', {
                  required: !editingProduct && 'Product image is required'
                })}
                onChange={handleImageChange}
              />
              {preview ? (
                <div className="w-full h-48 relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-fill"
                  />
                  <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white">Change image</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 flex flex-col items-center bg-base-100 justify-center p-4">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-gray-400">upload image</p>
                </div>
              )}
            </div>
            {errors.image && (
              <span className="text-red-500 text-sm mt-1 block">{errors.image.message}</span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
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
                        onClick={() => handleCategorySelect(category)}
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
                        key={subCategory.id}
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleSubCategorySelect(subCategory)}
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
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm mb-1 block">description</label>
        <input
          id="description"
          type="text"
          className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Description must be at least 10 characters' }
          })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1 block">{errors.description.message}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dosage" className="text-sm mb-1 block">dosage</label>
          <input
            id="dosage"
            type="text"
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
            {...register('dosage', {
              required: 'Dosage is required'
            })}
          />
          {errors.dosage && (
            <span className="text-red-500 text-sm mt-1 block">{errors.dosage.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="usageInstructions" className="text-sm mb-1 block">Usage Instructions</label>
          <input
            id="usageInstructions"
            type="text"
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
            {...register('usageInstructions', {
              required: 'Usage Instructions is required'
            })}
          />
          {errors.usageInstructions && (
            <span className="text-red-500 text-sm mt-1 block">{errors.usageInstructions.message}</span>
          )}
        </div>

      </div>



      <div>
        <label htmlFor="sideEffects" className="text-sm  mb-1 block">side effects</label>
        <input
          id="sideEffects"
          type="text"
          className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
          {...register('sideEffects')}
        />
      </div>

      <div className="flex items-center mt-4">
        <input
          id="requiresPrescription"
          type="checkbox"
          className="w-4 h-4 mr-2 cursor-pointer"
          {...register('requiresPrescription')}
        />
        <label htmlFor="requiresPrescription" className="text-sm cursor-pointer">
          this product require perception
        </label>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
        >
          {editingProduct ? 'save changes' : 'add'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;