import { UseFormRegister } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { ProductFormData } from './types';

interface FormProps {
  register: UseFormRegister<ProductFormData>;
  errors: Record<string, { message?: string }>;
}

interface ImageUploadProps extends FormProps {
  preview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload = ({ register, preview, handleImageChange, errors }: ImageUploadProps) => (
  <div className="w-full">
    <div className="relative border w-sm border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400 focus-within:border-white">
      <input
        type="file"
        id="image"
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
        {...register('image', {
          required: 'Product image is required'
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
);

export default ImageUpload; 