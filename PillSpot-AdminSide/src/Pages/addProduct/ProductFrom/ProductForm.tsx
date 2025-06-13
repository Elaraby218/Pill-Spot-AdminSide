import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import axiosInstance from '../../../axiosInstance';
import { addProduct } from '../../../Featurs/product/productSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../App/Store';
import { ProductFormProps, Category, SubCategory, ProductFormData } from './types';
import BasicInfoSection from './BasicInfoSection';
import ImageUpload from './ImageUpload';
import CategorySelection from './CategorySelection';
import SubCategorySelection from './SubCategorySelection';
import ProductDetails from './ProductDetails';

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

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategoryId) {
        setIsLoadingSubCategories(true);
        try {
          const response = await axiosInstance.get(`/api/categories/${selectedCategoryId}/subcategories`);
          setSubCategories(response.data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
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
      onSubmit(transformedData);
    } else {
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
          <BasicInfoSection register={register} errors={errors as FieldErrors<ProductFormData>} />
          <ImageUpload
            register={register}
            preview={preview}
            handleImageChange={handleImageChange}
            errors={errors as FieldErrors<ProductFormData>}
            editingProduct={editingProduct}
          />
        </div>

        <div className="flex gap-4">
          <CategorySelection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            isLoading={isLoading}
            filteredCategories={filteredCategories}
            handleCategorySelect={handleCategorySelect}
            register={register}
            errors={errors as FieldErrors<ProductFormData>}
          />

          <SubCategorySelection
            subCategorySearchTerm={subCategorySearchTerm}
            setSubCategorySearchTerm={setSubCategorySearchTerm}
            showSubCategoryDropdown={showSubCategoryDropdown}
            setShowSubCategoryDropdown={setShowSubCategoryDropdown}
            selectedCategoryId={selectedCategoryId}
            isLoadingSubCategories={isLoadingSubCategories}
            filteredSubCategories={filteredSubCategories}
            handleSubCategorySelect={handleSubCategorySelect}
            register={register}
            errors={errors as FieldErrors<ProductFormData>}
          />
        </div>
      </div>

      <ProductDetails register={register} errors={errors as FieldErrors<ProductFormData>} />

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