import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Upload } from 'lucide-react';



interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    dosage: string;
    price: string;
    manufacturer: string;
    sideEffects: string;
    requiresPrescription: boolean;
    image: string | null;
  }

interface ProductFormData {
    name: string;
    category: string;
    description: string;
    dosage: string;
    price: string;
    manufacturer: string;
    sideEffects: string;
    requiresPrescription: boolean;
    image: FileList;
  }

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  editingProduct: Product | null;
}

const ProductForm = ({ onSubmit, editingProduct }: ProductFormProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    watch,
    setValue,
    formState: { errors } 
  } = useForm<ProductFormData>();

  const imageFile = watch('image');
  console.log(imageFile)

  useEffect(() => {
    if (editingProduct) {
      setValue('name', editingProduct.name);
      setValue('category', editingProduct.category);
      setValue('description', editingProduct.description);
      setValue('dosage', editingProduct.dosage);
      setValue('price', editingProduct.price);
      setValue('manufacturer', editingProduct.manufacturer);
      setValue('sideEffects', editingProduct.sideEffects || '');
      setValue('requiresPrescription', editingProduct.requiresPrescription);
      setPreview(editingProduct.image);
    } else {
      reset();
      setPreview(null);
    }
  }, [editingProduct, setValue, reset]);

  const handleFormSubmit: SubmitHandler<ProductFormData> = (data) => {
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
        </div>

        <div>
          <label htmlFor="category" className="text-sm  mb-1 block">category</label>
          <input
            id="category"
            type="text"
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
            {...register('category', { 
              required: 'Category is required' 
            })}
          />
          {errors.category && (
            <span className="text-red-500 text-sm mt-1 block">{errors.category.message}</span>
          )}
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

      <div>
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