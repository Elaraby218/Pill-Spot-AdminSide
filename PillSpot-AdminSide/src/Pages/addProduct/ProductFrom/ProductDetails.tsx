import { UseFormRegister } from 'react-hook-form';
import { ProductFormData } from './types';


interface FormProps {
  register: UseFormRegister<ProductFormData>;
  errors: Record<string, { message?: string }>;
}

const ProductDetails = ({ register, errors }: FormProps) => (
  <>
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
      <label htmlFor="sideEffects" className="text-sm mb-1 block">side effects</label>
      <input
        id="sideEffects"
        type="text"
        className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300"
        {...register('sideEffects')}
      />
    </div>
  </>
);

export default ProductDetails; 