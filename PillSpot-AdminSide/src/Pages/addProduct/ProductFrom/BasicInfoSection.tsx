import { UseFormRegister } from 'react-hook-form';
import { ProductFormData } from './types';


interface FormProps {
  register: UseFormRegister<ProductFormData>;
  errors: Record<string, { message?: string }>;
}

const BasicInfoSection = ({ register, errors }: FormProps) => (
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

    <label htmlFor="manufacturer" className="text-sm mb-1 block">manufacturer</label>
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
      <label htmlFor="price" className="text-sm mb-1 block">price</label>
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
);

export default BasicInfoSection; 