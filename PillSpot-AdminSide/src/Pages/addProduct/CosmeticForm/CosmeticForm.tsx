import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Upload } from 'lucide-react';

interface CosmeticProduct {
  id: string;
  brand: string;
  skinType: string;
  volume: number;
  subCategoryId: string;
  name: string;
  description: string;
  price: number;
  usageInstructions: string;
  image: string | null;
}

interface CosmeticProductFormData {
  brand: string;
  skinType: string;
  volume: number;
  subCategoryId: string;
  name: string;
  description: string;
  price: number;
  usageInstructions: string;
  image: FileList;
}

interface CosmeticFormProps {
  onSubmit: (data: CosmeticProductFormData) => void;
  editingProduct: CosmeticProduct | null;
}

const CosmeticForm = ({ onSubmit, editingProduct }: CosmeticFormProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    watch,
    setValue,
    formState: { errors } 
  } = useForm<CosmeticProductFormData>();

  const imageFile = watch('image');

  useEffect(() => {
    if (editingProduct) {
      setValue('brand', editingProduct.brand);
      setValue('skinType', editingProduct.skinType);
      setValue('volume', editingProduct.volume);
      setValue('subCategoryId', editingProduct.subCategoryId);
      setValue('name', editingProduct.name);
      setValue('description', editingProduct.description);
      setValue('price', editingProduct.price);
      setValue('usageInstructions', editingProduct.usageInstructions);
      setPreview(editingProduct.image);
    } else {
      reset();
      setPreview(null);
    }
  }, [editingProduct, setValue, reset]);

  const handleFormSubmit: SubmitHandler<CosmeticProductFormData> = (data) => {
    onSubmit(data);
    if (!editingProduct) {
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
      <div>
        <div className="relative border border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400 focus-within:border-white">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="brand" className="text-sm mb-1 block">Brand</label>
          <input
            id="brand"
            type="text"
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
            {...register('brand', { 
              required: 'Brand is required',
              minLength: { value: 2, message: 'Brand must be at least 2 characters' }
            })}
          />
          {errors.brand && (
            <span className="text-red-500 text-sm mt-1 block">{errors.brand.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="skinType" className="text-sm mb-1 block">Skin Type</label>
          <input
            id="skinType"
            type="text"
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
            {...register('skinType', { 
              required: 'Skin type is required' 
            })}
          />
          {errors.skinType && (
            <span className="text-red-500 text-sm mt-1 block">{errors.skinType.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="volume" className="text-sm mb-1 block">Volume (ml)</label>
          <input
            id="volume"
            type="number"
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
            {...register('volume', { 
              required: 'Volume is required',
              min: { value: 1, message: 'Volume must be greater than 0' }
            })}
          />
          {errors.volume && (
            <span className="text-red-500 text-sm mt-1 block">{errors.volume.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="subCategoryId" className="text-sm mb-1 block">Sub Category ID</label>
          <input
            id="subCategoryId"
            type="text"
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
            {...register('subCategoryId', { 
              required: 'Sub category ID is required' 
            })}
          />
          {errors.subCategoryId && (
            <span className="text-red-500 text-sm mt-1 block">{errors.subCategoryId.message}</span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="name" className="text-sm mb-1 block">Name</label>
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
      </div>

      <div>
        <label htmlFor="description" className="text-sm mb-1 block">Description</label>
        <textarea
          id="description"
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

      <div>
        <label htmlFor="price" className="text-sm mb-1 block">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
          {...register('price', { 
            required: 'Price is required',
            min: { value: 0, message: 'Price must be greater than or equal to 0' }
          })}
        />
        {errors.price && (
          <span className="text-red-500 text-sm mt-1 block">{errors.price.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="usageInstructions" className="text-sm mb-1 block">Usage Instructions</label>
        <textarea
          id="usageInstructions"
          className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
          {...register('usageInstructions', { 
            required: 'Usage instructions are required',
            minLength: { value: 10, message: 'Usage instructions must be at least 10 characters' }
          })}
        />
        {errors.usageInstructions && (
          <span className="text-red-500 text-sm mt-1 block">{errors.usageInstructions.message}</span>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
        >
          {editingProduct ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default CosmeticForm; 